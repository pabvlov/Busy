import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponentComponent {
  @Input() isActive!: boolean;
  @Output() starClicked: EventEmitter<void> = new EventEmitter<void>();
  isHovered: boolean = false;
  isHoveredPrevious: boolean = false;

  onMouseEnter() {
    this.isHovered = true;
    this.isHoveredPrevious = true;
  }

  onMouseLeave() {
    this.isHovered = false;
    this.isHoveredPrevious = false;
  }

  onClick() {
    this.starClicked.emit();
  }

  get starClasses(): string {
    return this.isActive ? 'active' : (this.isHovered ? 'hovered' : 'hovered-previous');
  }
}
