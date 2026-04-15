export const REVIEW_CATEGORIES = [
  {
    id: "heart-anatomy",
    title: "Heart Anatomy",
    description: "Review chambers, valves, vessels, and basic cardiac structure.",
    icon: "/assets/icon-rhythms.svg",
  },
  {
    id: "medication",
    title: "Medication",
    description: "Quick review of common emergency cardiac medications.",
    icon: "/assets/icon-case-studies.svg",
  },
  {
    id: "heart-conditions",
    title: "Heart Conditions",
    description: "Test recognition of important cardiac-related conditions.",
    icon: "/assets/icon-reviews.svg",
  },
];

function q(question, correctAnswer, feedbackByChoice) {
  return {
    question,
    choices: Object.keys(feedbackByChoice),
    correctAnswer,
    feedbackByChoice,
  };
}

export const REVIEW_QUESTIONS = {
  "heart-anatomy": [
    q("Which chamber of the heart pumps oxygenated blood to the body?", "Left ventricle", {
      "Right atrium": "Not quite. The right atrium receives deoxygenated blood from the body; it does not pump blood out to systemic circulation.",
      "Right ventricle": "Not quite. The right ventricle pumps blood to the lungs for oxygenation, not to the whole body.",
      "Left atrium": "Not quite. The left atrium receives oxygenated blood from the lungs, then passes it to the left ventricle.",
      "Left ventricle": "Correct. The left ventricle generates the pressure needed to pump oxygenated blood through the aorta to the body.",
    }),
    q("Which valve sits between the left atrium and left ventricle?", "Mitral valve", {
      "Tricuspid valve": "Not quite. The tricuspid valve is on the right side between the right atrium and right ventricle.",
      "Pulmonary valve": "Not quite. The pulmonary valve controls blood leaving the right ventricle toward the lungs.",
      "Mitral valve": "Correct. The mitral valve separates the left atrium from the left ventricle.",
      "Aortic valve": "Not quite. The aortic valve sits between the left ventricle and the aorta.",
    }),
    q("Which blood vessels carry blood away from the heart?", "Arteries", {
      Veins: "Not quite. Veins carry blood back toward the heart.",
      Arteries: "Correct. Arteries carry blood away from the heart, whether oxygenated or deoxygenated.",
      Capillaries: "Not quite. Capillaries are tiny exchange vessels where oxygen, carbon dioxide, and nutrients move between blood and tissue.",
      Venules: "Not quite. Venules collect blood from capillaries and drain it toward veins.",
    }),
    q("The right side of the heart primarily sends blood to the:", "Lungs", {
      Brain: "Not quite. The brain receives oxygenated blood from the left side through systemic circulation.",
      Lungs: "Correct. The right ventricle sends deoxygenated blood to the lungs through the pulmonary artery.",
      Liver: "Not quite. The liver is part of systemic circulation supplied by the left side of the heart.",
      "Body tissues": "Not quite. Body tissues receive oxygenated blood from the left ventricle through the aorta.",
    }),
    q("Which structure separates the right and left sides of the heart?", "Septum", {
      Septum: "Correct. The septum is the wall that divides the right and left sides of the heart.",
      Pericardium: "Not quite. The pericardium is the protective sac around the heart, not the internal divider.",
      Myocardium: "Not quite. The myocardium is the muscular heart wall that contracts to pump blood.",
      Atria: "Not quite. The atria are the upper receiving chambers of the heart.",
    }),
    q("Which vessel carries oxygenated blood from the lungs to the heart?", "Pulmonary vein", {
      "Pulmonary artery": "Not quite. The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs.",
      "Superior vena cava": "Not quite. The superior vena cava returns deoxygenated blood from the upper body to the right atrium.",
      "Pulmonary vein": "Correct. Pulmonary veins carry oxygenated blood from the lungs to the left atrium.",
      Aorta: "Not quite. The aorta carries oxygenated blood from the left ventricle to the body.",
    }),
    q("What is the name of the outer sac surrounding the heart?", "Pericardium", {
      Endocardium: "Not quite. The endocardium is the inner lining of the heart chambers.",
      Pericardium: "Correct. The pericardium is the sac that surrounds and protects the heart.",
      Myocardium: "Not quite. The myocardium is the heart muscle layer responsible for contraction.",
      Pleura: "Not quite. The pleura are membranes surrounding the lungs, not the heart.",
    }),
    q("The tricuspid valve is located between the:", "Right atrium and right ventricle", {
      "Left atrium and left ventricle": "Not quite. That location contains the mitral valve.",
      "Right atrium and right ventricle": "Correct. The tricuspid valve controls flow from the right atrium into the right ventricle.",
      "Left ventricle and aorta": "Not quite. That location contains the aortic valve.",
      "Right ventricle and pulmonary artery": "Not quite. That location contains the pulmonary valve.",
    }),
    q("Which chamber receives deoxygenated blood from the body first?", "Right atrium", {
      "Left atrium": "Not quite. The left atrium receives oxygenated blood from the lungs.",
      "Right atrium": "Correct. The right atrium receives deoxygenated blood from the vena cavae.",
      "Left ventricle": "Not quite. The left ventricle pumps oxygenated blood to the body.",
      "Right ventricle": "Not quite. The right ventricle receives blood from the right atrium, not directly from the body first.",
    }),
    q("The aorta carries blood from the:", "Left ventricle to body", {
      "Right ventricle to lungs": "Not quite. Blood from the right ventricle goes to the lungs through the pulmonary artery.",
      "Left ventricle to body": "Correct. The aorta carries oxygenated blood from the left ventricle into systemic circulation.",
      "Right atrium to lungs": "Not quite. The right atrium sends blood to the right ventricle, not directly to the lungs.",
      "Left atrium to body": "Not quite. The left atrium passes blood to the left ventricle before it leaves the heart.",
    }),
  ],

  medication: [
    q("Which medication is commonly used in cardiac arrest according to ACLS protocols?", "Epinephrine", {
      Ibuprofen: "Not quite. Ibuprofen treats pain and inflammation; it is not a cardiac arrest medication.",
      Epinephrine: "Correct. Epinephrine is commonly used during cardiac arrest to support perfusion pressure.",
      Metformin: "Not quite. Metformin is a diabetes medication and does not treat cardiac arrest.",
      Amoxicillin: "Not quite. Amoxicillin is an antibiotic and has no role in ACLS cardiac arrest treatment.",
    }),
    q("Nitroglycerin is commonly used to help relieve:", "Chest pain", {
      "Chest pain": "Correct. Nitroglycerin can relieve ischemic chest discomfort by reducing cardiac workload and dilating vessels.",
      Fever: "Not quite. Fever is treated with antipyretics and by addressing the cause, not nitroglycerin.",
      Infection: "Not quite. Infections require antimicrobials or source control; nitroglycerin does not treat infection.",
      Seizures: "Not quite. Seizures are treated with anticonvulsant medications, not nitroglycerin.",
    }),
    q("Aspirin is often given in suspected cardiac chest pain because it helps:", "Reduce clotting", {
      "Lower blood sugar": "Not quite. Aspirin does not lower glucose; insulin or other diabetes therapies address blood sugar.",
      "Reduce clotting": "Correct. Aspirin reduces platelet aggregation, which can help limit clot growth in suspected ACS.",
      "Increase pulse rate": "Not quite. Aspirin is not used to raise heart rate.",
      "Reduce fever only": "Not quite. Aspirin can reduce fever, but in cardiac chest pain its key benefit is antiplatelet activity.",
    }),
    q("Amiodarone may be used for certain serious:", "Arrhythmias", {
      "Skin conditions": "Not quite. Amiodarone is not a dermatology medication.",
      Arrhythmias: "Correct. Amiodarone is an antiarrhythmic used for selected serious rhythm disturbances.",
      "Broken bones": "Not quite. Broken bones need immobilization and orthopedic care, not antiarrhythmics.",
      "Asthma attacks": "Not quite. Asthma attacks are treated with bronchodilators and other respiratory therapies.",
    }),
    q("Atropine is commonly associated with treatment of:", "Bradycardia", {
      Bradycardia: "Correct. Atropine can increase heart rate in symptomatic bradycardia.",
      Hypertension: "Not quite. Atropine is not used to lower high blood pressure.",
      Hyperglycemia: "Not quite. Hyperglycemia is treated with glucose management, not atropine.",
      Stroke: "Not quite. Stroke care focuses on recognition, imaging, reperfusion eligibility, and supportive care.",
    }),
    q("A medication that helps open blocked coronary arteries in some emergencies is called a:", "Thrombolytic", {
      Bronchodilator: "Not quite. Bronchodilators open airways, not blocked coronary arteries.",
      Thrombolytic: "Correct. Thrombolytics can dissolve clots in selected emergencies when appropriate.",
      Sedative: "Not quite. Sedatives reduce anxiety or consciousness but do not dissolve coronary clots.",
      Diuretic: "Not quite. Diuretics remove fluid; they do not directly open a blocked coronary artery.",
    }),
    q("Before giving nitroglycerin, a major concern is the patient's:", "Blood pressure", {
      "Blood pressure": "Correct. Nitroglycerin can lower blood pressure, so hypotension is a major safety concern.",
      "Hair color": "Not quite. Hair color has no clinical relevance to nitroglycerin safety.",
      Height: "Not quite. Height is not the key safety check before nitroglycerin.",
      "Blood type": "Not quite. Blood type matters for transfusion, not routine nitroglycerin administration.",
    }),
    q("Epinephrine primarily supports cardiac arrest care by causing:", "Vasoconstriction", {
      Vasoconstriction: "Correct. Epinephrine causes vasoconstriction, helping improve coronary and cerebral perfusion pressure during CPR.",
      "Bone growth": "Not quite. Epinephrine does not stimulate bone growth.",
      "Lower temperature": "Not quite. Epinephrine is not used as a cooling medication.",
      Sedation: "Not quite. Epinephrine is a stimulant-like catecholamine, not a sedative.",
    }),
    q("Which medication is an antiarrhythmic?", "Amiodarone", {
      Amiodarone: "Correct. Amiodarone is an antiarrhythmic used for selected abnormal heart rhythms.",
      Acetaminophen: "Not quite. Acetaminophen treats pain and fever; it does not treat arrhythmias.",
      Insulin: "Not quite. Insulin lowers blood glucose and is not an antiarrhythmic.",
      Diphenhydramine: "Not quite. Diphenhydramine is an antihistamine and is not used to control cardiac rhythm.",
    }),
    q("Aspirin is typically avoided if the patient has a serious:", "Allergy to aspirin", {
      "Paper cut": "Not quite. A minor paper cut is not usually a reason to avoid aspirin.",
      "Allergy to aspirin": "Correct. A serious aspirin allergy is a contraindication because it can cause dangerous reactions.",
      "Cold hand": "Not quite. A cold hand alone does not indicate aspirin allergy or a standard contraindication.",
      "Mild headache": "Not quite. A mild headache is not typically a reason to avoid aspirin in suspected cardiac chest pain.",
    }),
  ],

  "heart-conditions": [
    q("Myocardial infarction is another term for:", "Heart attack", {
      "Heart attack": "Correct. Myocardial infarction means heart muscle injury from inadequate blood flow.",
      Stroke: "Not quite. A stroke affects brain tissue, not heart muscle.",
      Asthma: "Not quite. Asthma is an airway disease, not a coronary blood flow problem.",
      Pneumonia: "Not quite. Pneumonia is a lung infection and is different from myocardial infarction.",
    }),
    q("Bradycardia means the heart rate is:", "Too slow", {
      "Too fast": "Not quite. A heart rate that is too fast is tachycardia.",
      "Too slow": "Correct. Bradycardia means the heart rate is slower than expected.",
      "Irregular only": "Not quite. Bradycardia describes rate, not whether the rhythm is regular or irregular.",
      Normal: "Not quite. Bradycardia means slow; it may be normal in some people but the term itself means low rate.",
    }),
    q("Tachycardia means the heart rate is:", "Too fast", {
      "Too slow": "Not quite. A heart rate that is too slow is bradycardia.",
      "Too fast": "Correct. Tachycardia means the heart rate is faster than expected.",
      Absent: "Not quite. An absent pulse suggests arrest or no perfusing rhythm, not tachycardia.",
      "Weak only": "Not quite. A weak pulse describes pulse quality, not heart rate.",
    }),
    q("Congestive heart failure often causes fluid buildup and:", "Shortness of breath", {
      "Shortness of breath": "Correct. Fluid backing up into the lungs can cause dyspnea in congestive heart failure.",
      "Hearing loss": "Not quite. Hearing loss is not a typical sign of congestive heart failure.",
      Rash: "Not quite. A rash is not a primary symptom caused by heart failure fluid overload.",
      "Broken bones": "Not quite. Heart failure does not directly cause bone fractures.",
    }),
    q("Atrial fibrillation is a type of:", "Arrhythmia", {
      Fracture: "Not quite. A fracture is a broken bone, not a heart rhythm problem.",
      Arrhythmia: "Correct. Atrial fibrillation is an abnormal heart rhythm with irregular atrial activity.",
      Infection: "Not quite. Atrial fibrillation is electrical/rhythm-related, not an infection.",
      "Valve replacement": "Not quite. Valve replacement is a procedure, not a rhythm diagnosis.",
    }),
    q("Cardiac arrest means the heart has:", "Stopped effective pumping", {
      "Stopped effective pumping": "Correct. Cardiac arrest means the heart is not producing effective circulation.",
      "A mild murmur": "Not quite. A murmur is an abnormal heart sound and does not equal cardiac arrest.",
      "Low cholesterol": "Not quite. Cholesterol level does not define cardiac arrest.",
      "A blocked airway": "Not quite. A blocked airway can cause deterioration, but cardiac arrest is failure of effective circulation.",
    }),
    q("Angina is best described as:", "Chest discomfort from reduced blood flow", {
      "A skin infection": "Not quite. Angina is cardiac chest discomfort, not an infection of the skin.",
      "Chest discomfort from reduced blood flow": "Correct. Angina is chest discomfort caused by reduced oxygen supply to heart muscle.",
      "A broken rib": "Not quite. A broken rib can cause chest pain, but it is musculoskeletal trauma, not angina.",
      "A seizure disorder": "Not quite. Seizures involve abnormal brain activity, not reduced coronary blood flow.",
    }),
    q("Hypertension means:", "High blood pressure", {
      "Low blood sugar": "Not quite. Low blood sugar is hypoglycemia.",
      "High blood pressure": "Correct. Hypertension means elevated blood pressure.",
      "Low heart rate": "Not quite. Low heart rate is bradycardia.",
      "High temperature": "Not quite. High temperature is fever or hyperthermia, not hypertension.",
    }),
    q("A patient with poor blood flow to heart muscle may develop:", "Ischemia", {
      Ischemia: "Correct. Ischemia means tissue is not getting enough blood flow and oxygen.",
      Appendicitis: "Not quite. Appendicitis is inflammation of the appendix, not reduced heart muscle blood flow.",
      "Migraine only": "Not quite. Migraine is a neurologic headache disorder, not cardiac oxygen deprivation.",
      "Kidney stones": "Not quite. Kidney stones affect the urinary tract and do not describe heart muscle blood flow.",
    }),
    q("Ventricular fibrillation is considered a:", "Life-threatening rhythm", {
      "Life-threatening rhythm": "Correct. Ventricular fibrillation is a lethal rhythm that produces no effective cardiac output.",
      "Normal rhythm": "Not quite. Ventricular fibrillation is chaotic and not compatible with effective perfusion.",
      "Sleep disorder": "Not quite. Ventricular fibrillation is a cardiac rhythm emergency, not a sleep condition.",
      "Minor muscle strain": "Not quite. VFib is an electrical cardiac emergency, not a musculoskeletal injury.",
    }),
  ],
};
