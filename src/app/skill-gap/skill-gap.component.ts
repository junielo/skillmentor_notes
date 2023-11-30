import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SkillGapService } from './skill-gap.service';

@Component({
  selector: 'app-skill-gap',
  templateUrl: './skill-gap.component.html',
  styleUrls: ['./skill-gap.component.css']
})
export class SkillGapComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private service: SkillGapService
    ) { }
  ngOnInit(): void {
    this.fetchSkillGap()
  }

  skillGapData: any = []

  fetchSkillGap(){
    this.spinner.show();
    this.service.projectGap().subscribe(
      (response: any) => {
        const data = response.body

        const courseIdsSet = new Set<string>();
        const unitIdsSet = new Set<string>();

        // Loop through the data
        for (const item of data) {
          for (const course of item.courses) {
            // Add course_id to the Set
            courseIdsSet.add(course.course_id);

            // Add unit_id to the Set
            for (const topic of course.topics) {
              unitIdsSet.add(topic.unit_id);
            }
          }
        }

        // Convert Sets to Arrays if needed
        const courseIds: string[] = Array.from(courseIdsSet);
        const unitIds: string[] = Array.from(unitIdsSet);

        this.service.getCourses(courseIds).then(
          (response: any) => {
            const courseList = response.data
            this.service.getUnits(unitIds).then(
              (response2: any) => {
                const unitList = response2.data
                console.log(courseList)
                console.log(unitList)
                data.forEach((item: any) => {
                  item.courses.forEach((course: any) => {
                    courseList.forEach((courseItem: any) => {
                      if (courseItem.course_id === course.course_id) {
                        course.course_title = courseItem.course_title;
                      }
                    });

                    course.topics.forEach((topic: any) => {
                      unitList.forEach((unitItem: any) => {
                        if (unitItem.topic_id === topic.unit_id) {
                          topic.chapter_title = unitItem.chapter_title;
                          topic.duration = unitItem.duration;
                          topic.topic_title = unitItem.topic_title;
                        }
                      });
                    });
                  });
                })
                this.skillGapData = data
                console.log(this.skillGapData)
                this.spinner.hide();
              }
            )
          }
        )
      }
    )

  }

}
