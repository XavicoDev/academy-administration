import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';

@Component({
  selector: 'app-estadistic',
  templateUrl: './estadistic.component.html',
  styleUrl: './estadistic.component.css'
})
export class EstadisticComponent implements OnInit {
  totalCourses!: number;
  totalStudents!: number;
  topCourses!: any[];
  topStudents!: any[];

  constructor(private statisticsService: StatisticsService) {

  }
  ngOnInit(): void {
    this.statisticsService.getTotalCourses().subscribe(data => {
      this.totalCourses = data.total_courses;
    });
    this.statisticsService.getTotalStudents().subscribe(data => {
      this.totalStudents = data.total_students;
    });
    this.statisticsService.getTopCourses().subscribe(data => {
      this.topCourses = data;
      console.log(this.topCourses);
    });
    this.statisticsService.getTopStudents().subscribe(data => {
      this.topStudents = data;
    });
  }

}
