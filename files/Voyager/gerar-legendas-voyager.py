"""Gera legendas inglesas WebVTT a partir do áudio em português da Voyager.

Requisitos: pip install faster-whisper
Uso: python gerar-legendas-voyager.py caminho/para/palido-ponto-azul.mp4

Processa áudio localmente após o download do modelo Whisper. Não altera o MP4.
"""
from __future__ import annotations
import argparse
from pathlib import Path
import textwrap


def fmt(s: float) -> str:
    ms = max(0, round(s * 1000))
    hours, ms = divmod(ms, 3_600_000)
    mins, ms = divmod(ms, 60_000)
    secs, ms = divmod(ms, 1000)
    return f"{hours:02}:{mins:02}:{secs:02}.{ms:03}"


def caption_lines(txt: str) -> str:
    # Whisper translation often includes stray whitespace and filler markers.
    txt = ' '.join(txt.strip().split())
    return '\n'.join(textwrap.wrap(txt, width=43, break_long_words=False, break_on_hyphens=False))


def main() -> None:
    p = argparse.ArgumentParser(description="Cria legendas EN sincronizadas para o vídeo da Voyager")
    p.add_argument('video', type=Path, help="Caminho do MP4 original")
    p.add_argument('--model', default='small', choices=['tiny','base','small','medium','large-v3'], help="small: mais rápido; medium: melhor tradução")
    args = p.parse_args()
    video = args.video.expanduser().resolve()
    if not video.is_file():
        raise SystemExit(f"Arquivo não encontrado: {video}")
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        raise SystemExit('Instale a dependência: python -m pip install faster-whisper')

    print('Carregando modelo (a primeira execução faz o download)...')
    model = WhisperModel(args.model, device='cpu', compute_type='int8')
    print('Reconhecendo a narração em português e traduzindo para inglês...')
    segments, info = model.transcribe(
        str(video), language='pt', task='translate',
        beam_size=5, vad_filter=True, condition_on_previous_text=True,
    )

    cues = []
    for seg in segments:
        phrase = caption_lines(seg.text)
        if phrase:
            cues.append((seg.start, seg.end, phrase))
            print(f"{fmt(seg.start)} --> {fmt(seg.end)}  {phrase.replace(chr(10),' / ')}", flush=True)

    out = video.with_name(video.stem + '-en.vtt')
    with out.open('w', encoding='utf-8', newline='\n') as f:
        f.write('WEBVTT\n\n')
        for start, end, phrase in cues:
            f.write(f'{fmt(start)} --> {fmt(end)}\n{phrase}\n\n')
    print(f'\nArquivo gerado: {out}\nLegendas: {len(cues)}')
    print('Revise a tradução e os tempos antes da publicação: é uma transcrição automática.')

if __name__ == '__main__':
    main()
