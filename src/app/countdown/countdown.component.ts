import { CommonModule } from '@angular/common'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  title: string = 'Midsummer Eve'
  isTitleFocused: boolean = false
  targetDate: string = '2024-06-21'
  timeLeft: string | null = null
  private countdownInterval?: ReturnType<typeof setInterval>

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadData()
    this.updateCountdown()
    this.countdownInterval = setInterval(() => {
      this.updateCountdown()
    }, 1000)
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  }

  onTitleChange(): void {
    this.storageService.setItem('title', this.title)
  }

  onTargetDateChange(): void {
    this.storageService.setItem('targetDate', this.targetDate)
  }

  private updateCountdown(): void {
    if (!this.targetDate) {
      this.timeLeft = '-'
      return
    }

    const now = new Date().getTime()
    const target = new Date(this.targetDate).getTime()
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
    const timeDifference = target + timezoneOffset - now

    if (timeDifference <= 0) {
      this.timeLeft = "Time's up!"
      return
    }
    this.timeLeft = this.calculateTimeLeft(timeDifference)
  }

  private calculateTimeLeft(timeDifference: number): string {
    const msInDay = 24 * 60 * 60 * 1000
    const msInHour = 60 * 60 * 1000
    const msInMinute = 60 * 1000

    const days = Math.floor(timeDifference / msInDay)
    const hours = Math.floor((timeDifference % msInDay) / msInHour)
    const minutes = Math.floor(((timeDifference % msInDay) % msInHour) / msInMinute)
    const seconds = Math.floor((((timeDifference % msInDay) % msInHour) % msInMinute) / 1000)

    return `${days} days, ${hours} h, ${minutes}m, ${seconds}s`
  }

  private loadData(): void {
    const savedTitle = this.storageService.getItem('title')
    if (savedTitle) {
      this.title = savedTitle
    }

    const savedTargetDate = this.storageService.getItem('targetDate')
    if (savedTargetDate) {
      this.targetDate = savedTargetDate
    }
  }
}
