import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent {
  title: string = 'Midsummer Eve'
  isTitleFocused: boolean = false
}
