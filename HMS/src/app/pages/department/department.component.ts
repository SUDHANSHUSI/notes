import { Component } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent {
  i:number=0;
  department = [
    // {
    //   department_name: 'Cardiology',
    //   discription1: 'Provides medical care to patients who have problems with their heart or circulation.',
    //   discription2: "It involves the study of the structure and function of the heart, as well as the blood vessels and their role in circulation. Cardiologists are specialized medical professionals who diagnose and treat a wide range of conditions, including coronary artery disease, heart attacks, heart failure, arrhythmias, and valve disorders.",
    //   img: 'assets/img/departments-1.jpg',
    // },
    {
      department_name: 'Neurology',
      discription1: 'A medical specialty dealing with disorders of the nervous system',
      discription2: "Neurologists are specialized medical professionals who diagnose and treat a wide range of neurological conditions, such as epilepsy, Alzheimer's disease, Parkinson's disease, multiple sclerosis, and stroke. They use various diagnostic tools such as MRI scans, CT scans, and EEGs to evaluate the nervous system and determine the underlying cause of a patient's symptoms. ",
      img: 'assets/img/departments-2.jpg',
    },
    {
      department_name: 'Hepatology',
      discription1: 'Hepatology is the study and treatment of liver diseases, including viral hepatitis, cirrhosis, and liver cancer.',
      discription2:"They work closely with other healthcare professionals to develop individualized treatment plans for their patients, which may include lifestyle modifications, medication, or surgery. Hepatologists also play a critical role in the prevention and management of liver disease, including vaccination for viral hepatitis, screening for liver cancer, and counseling patients on healthy lifestyle choices.",
      img: 'assets/img/departments-3.jpg',
    },
    {
      department_name: 'Pediatrics',
      discription1: 'Pediatrics is the medical care of infants, children, and adolescents, including diagnosis, treatment, and prevention of childhood illnesses.',
      discription2:"Pediatrics is the branch of medicine that deals with the medical care of infants, children, and adolescents. Pediatricians are specialized medical professionals who diagnose, treat, and prevent a wide range of childhood illnesses, including infectious diseases, chronic illnesses, and developmental disorders. They also provide routine health check-ups, monitor growth and development, and provide",
      img: 'assets/img/departments-4.jpg',
    },
    {
      department_name: 'Eye Care',
      discription1: 'Eye care is the diagnosis and treatment of eye conditions such as cataracts, glaucoma, and macular degeneration.',
      discription2: "Eye care, is the branch of medicine that focuses on the diagnosis and treatment of conditions related to the eyes and visual system. Ophthalmologists are specialized medical professionals who diagnose and manage various eye diseases, including cataracts, glaucoma, macular degeneration, and diabetic retinopathy. They also perform surgeries such as LASIK, cataract removal, and corneal transplants.",
      img: 'assets/img/departments-5.jpg',
    },
  ];
}
