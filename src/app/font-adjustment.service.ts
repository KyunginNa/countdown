import { ElementRef, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class FontAdjustmentService {
  adjustFontSize(
    container: ElementRef<HTMLDivElement>,
    textElement: ElementRef<HTMLHeadingElement>,
  ) {
    const getElementWidth = (element: ElementRef) =>
      element.nativeElement.getBoundingClientRect().width
    const containerWidth = getElementWidth(container)
    let fontSize = parseInt(getComputedStyle(textElement.nativeElement).fontSize)

    while (fontSize > 0 && getElementWidth(textElement) > containerWidth) {
      fontSize--
      textElement.nativeElement.style.fontSize = `${fontSize}px`
    }

    while (getElementWidth(textElement) < containerWidth) {
      fontSize++
      textElement.nativeElement.style.fontSize = `${fontSize}px`

      if (getElementWidth(textElement) > containerWidth) {
        fontSize--
        textElement.nativeElement.style.fontSize = `${fontSize}px`
        break
      }
    }
  }
}
