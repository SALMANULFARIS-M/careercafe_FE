import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const [hours, minutes] = value.split(':').map(num => parseInt(num, 10));
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

}
}
