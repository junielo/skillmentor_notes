import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js'
import { ApiService, PROJECT_GAP, SUPABASE_KEY, SUPABASE_URL } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class SkillGapService {
  private supabase!: SupabaseClient

  constructor(private apiService: ApiService) {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  }

  projectGap(){
    const payload = {
      "acquired":[
          "Integration Platforms: Oracle Integration Cloud (OIC)",
          "Programming Languages: [Java, Python, kotlin, PHP]",
          "Adapters: Oracle Integration Cloud Adapters",
          "Process Automation: Business Process Execution Language (BPEL), Visual Builder",
          "Collaboration: Cross-functional Team Collaboration, Communication Skills",
          "Problem Solving: Analytical and Creative Problem Solving"
      ],
      "required":[
          "Oracle Integration Cloud (OIC): In-depth knowledge and extensive hands-on experience with Oracle Integration Cloud, including both on-premises and cloud-based integrations. Proficiency in utilizing OIC's visual development tools, adapters, and connectors for seamless connectivity.",
          "Integration Design and Development: Demonstrated expertise in designing and developing complex integrations between various applications, systems, and databases. Proven ability to architect and implement robust, scalable, and maintainable integration solutions.",
          "Adapters: Mastery of utilizing OIC adapters for connecting with different applications, databases, and services. Experience with a variety of adapters, including SaaS adapters, REST, SOAP, and other protocols.",
          "Business Process Automation: Strong background in business process automation using tools such as Business Process Execution Language (BPEL) and Visual Builder. Ability to streamline and optimize business workflows through automation.",
          "Problem-Solving Skills: Proven ability to troubleshoot and resolve complex integration issues promptly and effectively. Strategic problem-solving skills to identify and address integration challenges in a systematic manner.",
          "Project Management: Experience leading integration projects from conception to completion, ensuring on-time delivery and adherence to quality standards. Ability to work collaboratively with cross-functional teams and stakeholders.",
          "Performance Monitoring and Optimization: Expertise in monitoring integration performance, identifying bottlenecks, and implementing optimizations for improved reliability and efficiency.",
          "Security and Compliance: Knowledge of best practices in ensuring the security of data during integration processes. Understanding of regulatory compliance requirements related to data integration.",
          "Documentation and Communication: Strong documentation skills, including the ability to create comprehensive technical documentation for integrations. Excellent communication skills to effectively convey technical concepts to both technical and non-technical stakeholders.",
          "Continuous Learning: A commitment to staying updated on the latest Oracle Integration Cloud features, industry best practices, and emerging technologies.",
          "Certifications: Relevant certifications in Oracle Integration Cloud and related technologies.",
          "Leadership and Mentorship: Demonstrated leadership skills, especially if the role involves leading a team of integration professionals. Willingness and ability to mentor junior team members."
      ]
    }
    return this.apiService.post(PROJECT_GAP, payload)
  }

  getCourses(ids: string[]){
    return this.supabase
    .from('course_main')
    .select('*')
    .in('course_id', ids)
  }

  getUnits(ids: string[]){
    return this.supabase
    .from('topic_main')
    .select('*')
    .in('topic_id', ids)
  }
}
