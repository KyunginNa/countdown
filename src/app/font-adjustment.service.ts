import { ElementRef, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class FontAdjustmentService {
  adjustFontSize(container: ElementRef, textElement: ElementRef) {
    const containerWidth = container.nativeElement.clientWidth

    let fontSize = parseInt(getComputedStyle(textElement.nativeElement).fontSize)

    while (fontSize > 0 && textElement.nativeElement.scrollWidth > containerWidth) {
      fontSize--
      textElement.nativeElement.style.fontSize = `${fontSize}px`
    }

    while (textElement.nativeElement.scrollWidth <= containerWidth) {
      fontSize++
      textElement.nativeElement.style.fontSize = `${fontSize}px`
    }
  }
}
