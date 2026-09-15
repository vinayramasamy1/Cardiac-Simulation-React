export const RHYTHM_EDUCATION = {
  "normal-sinus": {
    overview: [
      "Normal sinus rhythm begins in the sinoatrial (SA) node, the heart's usual pacemaker. The impulse spreads through the atria, pauses briefly at the AV node, and then travels through the ventricles in an organized sequence.",
      "It is the reference pattern used when comparing other rhythms because atrial and ventricular activation occur in a consistent one-to-one relationship.",
    ],
    ecgCharacteristics: [
      { label: "Typical rate", value: "60-100 BPM" },
      { label: "Regularity", value: "Regular" },
      { label: "P waves", value: "One normal P wave before each QRS" },
      { label: "PR interval", value: "Consistent; typically 0.12-0.20 sec" },
      { label: "QRS", value: "Usually narrow, under 0.12 sec" },
      { label: "Key pattern", value: "Consistent P-QRS-T sequence" },
    ],
    clinicalNotes: [
      "Usually reflects normal impulse formation and conduction.",
      "Rate, symptoms, and overall clinical context still matter when assessing a patient.",
      "Changes in regularity or the P-to-QRS relationship may signal a different rhythm.",
    ],
    keyTakeaways: [
      "Starts in the SA node.",
      "Regular rhythm at 60-100 BPM.",
      "One P wave precedes every QRS.",
      "PR intervals remain consistent.",
    ],
  },
  "atrial-fibrillation": {
    overview: [
      "Atrial fibrillation is caused by rapid, disorganized atrial electrical activity rather than a single coordinated atrial impulse. The AV node allows impulses through unpredictably, producing an irregular ventricular response.",
      "Loss of coordinated atrial contraction can reduce filling efficiency and is clinically important because blood can stagnate in the atria, increasing thromboembolic risk.",
    ],
    ecgCharacteristics: [
      { label: "Typical rate", value: "Variable ventricular rate" },
      { label: "Regularity", value: "Irregularly irregular" },
      { label: "P waves", value: "No consistent, distinct P waves" },
      { label: "PR interval", value: "Not measurable" },
      { label: "QRS", value: "Usually narrow unless conduction is abnormal" },
      { label: "Key pattern", value: "Fibrillatory baseline with unpredictable R-R intervals" },
    ],
    clinicalNotes: [
      "May be intermittent or persistent and may occur with or without noticeable symptoms.",
      "Common associations include age, hypertension, structural heart disease, and acute illness.",
      "Clinical priorities depend on ventricular rate, duration, symptoms, perfusion, and stroke risk.",
    ],
    keyTakeaways: [
      "Irregularly irregular ventricular rhythm.",
      "No consistent P waves.",
      "PR interval cannot be measured reliably.",
      "Always interpret rate and patient stability together.",
    ],
  },
  "ventricular-fibrillation": {
    overview: [
      "Ventricular fibrillation is chaotic, disorganized electrical activity in the ventricles. The ventricular muscle does not contract in a coordinated way, so the heart produces no effective forward blood flow.",
      "This is a cardiac-arrest rhythm and an immediate emergency. Rapid recognition is essential because organized P waves, QRS complexes, and T waves are absent.",
    ],
    ecgCharacteristics: [
      { label: "Rate", value: "Not meaningfully measurable" },
      { label: "Regularity", value: "Chaotic and disorganized" },
      { label: "P waves", value: "Absent" },
      { label: "PR interval", value: "Not measurable" },
      { label: "QRS", value: "No identifiable QRS complexes" },
      { label: "Key pattern", value: "Continuously varying fibrillatory waves" },
    ],
    clinicalNotes: [
      "Produces loss of effective cardiac output and is associated with sudden cardiac arrest.",
      "Possible contributors include myocardial ischemia, severe electrolyte disturbance, hypoxia, and ventricular arrhythmias.",
      "Artifact can resemble VF, so the tracing must be interpreted with the patient and equipment assessment.",
    ],
    keyTakeaways: [
      "No organized ventricular complexes.",
      "No measurable pulse-producing rhythm.",
      "Chaotic amplitude and morphology.",
      "Treat as an immediate emergency in clinical settings.",
    ],
  },
  "atrial-flutter": {
    overview: [
      "Atrial flutter usually results from a rapid re-entry circuit in the atria. Atrial activation is organized but extremely fast, commonly near 300 beats per minute in typical flutter.",
      "The AV node blocks some atrial impulses, so the ventricular rate depends on the conduction ratio. This produces the characteristic repeating flutter-wave pattern.",
    ],
    ecgCharacteristics: [
      { label: "Atrial rate", value: "Often about 250-350 BPM" },
      { label: "Regularity", value: "Atrial activity regular; ventricular response may vary" },
      { label: "P waves", value: "Replaced by flutter (F) waves" },
      { label: "PR interval", value: "Usually not measurable" },
      { label: "QRS", value: "Usually narrow" },
      { label: "Key pattern", value: "Sawtooth flutter waves with an AV conduction ratio" },
    ],
    clinicalNotes: [
      "The ventricular rhythm is regular with a fixed block and irregular with variable conduction.",
      "It may occur with structural heart disease, pulmonary disease, or after cardiac procedures.",
      "Clinical significance depends on ventricular response, duration, symptoms, and perfusion.",
    ],
    keyTakeaways: [
      "Look for repeating sawtooth flutter waves.",
      "Atrial activity is rapid but organized.",
      "Ventricular rate reflects the conduction ratio.",
      "Variable block can make the ventricular rhythm irregular.",
    ],
  },
  "sinus-tachycardia": {
    overview: [
      "Sinus tachycardia is a sinus rhythm faster than 100 BPM in adults. The SA node remains the pacemaker, and electrical activation follows the normal atrial-to-ventricular pathway.",
      "It is often a physiologic response to increased demand or stress rather than a primary rhythm disorder, so the underlying context is important.",
    ],
    ecgCharacteristics: [
      { label: "Typical rate", value: "Over 100 BPM; often 100-160 BPM" },
      { label: "Regularity", value: "Regular" },
      { label: "P waves", value: "Normal P wave before each QRS" },
      { label: "PR interval", value: "Consistent and usually normal" },
      { label: "QRS", value: "Usually narrow" },
      { label: "Key pattern", value: "Normal sinus sequence at a faster rate" },
    ],
    clinicalNotes: [
      "Common associations include exercise, pain, fever, anxiety, hypovolemia, and hypoxia.",
      "The rate often changes gradually as the underlying stimulus changes.",
      "Assessment focuses on why the sinus node is responding with an increased rate.",
    ],
    keyTakeaways: [
      "A sinus pattern faster than 100 BPM.",
      "One normal P wave before every QRS.",
      "Usually regular with narrow complexes.",
      "Look for an underlying physiologic trigger.",
    ],
  },
  "ventricular-tachycardia": {
    overview: [
      "Ventricular tachycardia is a rapid rhythm arising below the AV node in ventricular tissue. Ventricular activation spreads outside the normal conduction pathway, typically creating wide, abnormal QRS complexes.",
      "VT can significantly reduce cardiac output and may deteriorate into ventricular fibrillation. Its urgency depends on pulse status and hemodynamic stability.",
    ],
    ecgCharacteristics: [
      { label: "Typical rate", value: "Usually 100-250 BPM" },
      { label: "Regularity", value: "Usually regular in monomorphic VT" },
      { label: "P waves", value: "Often absent, hidden, or dissociated" },
      { label: "PR interval", value: "Usually not measurable consistently" },
      { label: "QRS", value: "Wide; typically 0.12 sec or greater" },
      { label: "Key pattern", value: "Rapid sequence of wide ventricular complexes" },
    ],
    clinicalNotes: [
      "May occur with myocardial ischemia, scar, cardiomyopathy, electrolyte imbalance, or drug effects.",
      "A patient may have a pulse or may be in cardiac arrest, so clinical assessment is essential.",
      "A regular wide-complex tachycardia should be treated as potentially ventricular in origin until clarified.",
    ],
    keyTakeaways: [
      "Fast rhythm with wide QRS complexes.",
      "Usually originates in ventricular tissue.",
      "P waves may be unrelated to QRS complexes.",
      "Can rapidly become life-threatening.",
    ],
  },
  "supraventricular-tachycardia": {
    overview: [
      "Supraventricular tachycardia describes a rapid rhythm originating above the ventricles, commonly involving a re-entry circuit near the AV node or an accessory pathway. Ventricular activation usually still uses the normal conduction system.",
      "The rhythm often begins and ends suddenly. Fast rates can shorten filling time and cause palpitations, lightheadedness, chest discomfort, or reduced perfusion.",
    ],
    ecgCharacteristics: [
      { label: "Typical rate", value: "Often 150-250 BPM" },
      { label: "Regularity", value: "Very regular" },
      { label: "P waves", value: "May be hidden, retrograde, or difficult to identify" },
      { label: "PR interval", value: "Often not measurable" },
      { label: "QRS", value: "Usually narrow, under 0.12 sec" },
      { label: "Key pattern", value: "Rapid, regular narrow-complex tachycardia" },
    ],
    clinicalNotes: [
      "SVT is a broad category; the exact mechanism cannot always be identified from a single strip.",
      "Aberrant conduction or pre-excitation can produce a wide-complex appearance.",
      "Symptoms and hemodynamic stability determine the clinical urgency.",
    ],
    keyTakeaways: [
      "Usually fast, regular, and narrow-complex.",
      "P waves may be buried in the QRS or T wave.",
      "Often starts and stops abruptly.",
      "Assess the patient, not only the displayed rate.",
    ],
  },
  wpw: {
    overview: [
      "Wolff-Parkinson-White pattern reflects ventricular pre-excitation through an accessory electrical pathway connecting the atria and ventricles. Part of the ventricle activates earlier than it would through the AV node alone.",
      "The accessory pathway can support re-entry tachycardias. WPW syndrome refers to the ECG pattern together with clinically relevant tachyarrhythmia symptoms.",
    ],
    ecgCharacteristics: [
      { label: "Rate", value: "Depends on the underlying rhythm" },
      { label: "Regularity", value: "Usually regular in baseline sinus rhythm" },
      { label: "P waves", value: "Usually sinus P waves at baseline" },
      { label: "PR interval", value: "Short, typically under 0.12 sec" },
      { label: "QRS", value: "Widened by pre-excitation" },
      { label: "Key pattern", value: "Delta wave: slurred initial QRS upstroke" },
    ],
    clinicalNotes: [
      "Some people have an incidental WPW pattern and never develop symptomatic arrhythmia.",
      "Accessory pathways can participate in several forms of rapid rhythm.",
      "The appearance during tachycardia may differ from the classic baseline pre-excitation pattern.",
    ],
    keyTakeaways: [
      "Accessory pathway causes pre-excitation.",
      "Classic triad: short PR, delta wave, widened QRS.",
      "Baseline pattern and tachycardia appearance may differ.",
      "Associated with re-entry tachyarrhythmias.",
    ],
  },
  "ectopic-atrial-rhythm": {
    overview: [
      "An ectopic atrial rhythm begins from an atrial focus outside the SA node. Atrial activation therefore travels in a different direction before reaching the AV node and ventricles.",
      "The rhythm is generally organized, but its P-wave shape differs from sinus rhythm. The significance varies with the rate, persistence, symptoms, and clinical setting.",
    ],
    ecgCharacteristics: [
      { label: "Typical rate", value: "Often under 100 BPM" },
      { label: "Regularity", value: "Usually regular" },
      { label: "P waves", value: "Present but different from sinus P waves" },
      { label: "PR interval", value: "May differ from the patient's sinus PR" },
      { label: "QRS", value: "Usually narrow" },
      { label: "Key pattern", value: "Consistent non-sinus P-wave morphology" },
    ],
    clinicalNotes: [
      "P-wave polarity and shape depend on the location of the atrial focus and the ECG lead.",
      "It may be transient and can occur with altered atrial automaticity or suppression of the sinus node.",
      "Clinical importance depends on associated symptoms, rate, and underlying conditions.",
    ],
    keyTakeaways: [
      "The pacemaker focus is outside the SA node.",
      "P waves are present but look non-sinus.",
      "The rhythm is usually regular with narrow QRS complexes.",
      "Compare P-wave shape across the tracing.",
    ],
  },
};
