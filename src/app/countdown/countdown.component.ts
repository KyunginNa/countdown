import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { StorageService } from '../storage.service'
import { Subscription, Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { FontAdjustmentService } from '../font-adjustment.service'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy, AfterViewInit {
  title: string = 'Midsummer Eve'
  isTitleFocused: boolean = false
  targetDate: string = '2024-06-21'
  timeLeft: string | null = null
  private countdownInterval?: ReturnType<typeof setInterval>

  @ViewChild('titleContainer') titleContainer!: ElementRef
  @ViewChild('titleElement') titleElement!: ElementRef
  @ViewChild('timeLeftContainer') timeLeftContainer!: ElementRef
  @ViewChild('timeLeftElement') timeLeftElement!: ElementRef

  private resizeSubject = new Subject<void>()
  private resizeSubscription?: Subscription

  constructor(
    private storageService: StorageService,
    private fontAdjustmentService: FontAdjustmentService,
  ) {}

  ngOnInit(): void {
    this.loadData()
    this.updateCountdown()
    this.countdownInterval = setInterval(() => {
      this.updateCountdown()
    }, 1000)

    this.resizeSubscription = this.resizeSubject.pipe(debounceTime(50)).subscribe(() => {
      this.adjustAllFontSizes()
    })
  }

  ngAfterViewInit(): void {
    this.resizeSubject.next()
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }

    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe()
    }
  }

  @HostListener('window:resize') onWindowResize() {
    this.resizeSubject.next()
  }

  onTitleChange(): void {
    this.storageService.setItem('title', this.title)
    this.resizeSubject.next()
  }

  onTargetDateChange(): void {
    this.storageService.setItem('targetDate', this.targetDate)
    this.resizeSubject.next()
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

  private adjustAllFontSizes(): void {
    this.fontAdjustmentService.adjustFontSize(this.titleContainer, this.titleElement)
    this.fontAdjustmentService.adjustFontSize(this.timeLeftContainer, this.timeLeftElement)
  }
}
