// Mock student dataset generator (5,000 students matching dataset distribution)
export const generateStudentsData = () => {
  const students = [];
  const genders = ["Male", "Female"];
  const binaryOpts = ["Yes", "No"];

  // Seeded deterministic pseudo-random generator
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 1; i <= 1000; i++) {
    const id = `KN${String(i).padStart(4, "0")}`;
    const age = Math.floor(18 + pseudoRandom() * 11);
    const gender = pseudoRandom() > 0.52 ? "Male" : "Female";
    const degree = Math.round((45 + pseudoRandom() * 53) * 100) / 100;
    const aptitude = Math.round((30 + pseudoRandom() * 68) * 100) / 100;
    const comm = Math.round((35 + pseudoRandom() * 62) * 100) / 100;
    const coding = Math.round((20 + pseudoRandom() * 78) * 100) / 100;
    const mock = Math.round((25 + pseudoRandom() * 73) * 100) / 100;
    const attendance = Math.round((50 + pseudoRandom() * 48) * 100) / 100;
    const projects = Math.floor(pseudoRandom() * 7);
    const dsa = Math.round((20 + pseudoRandom() * 78) * 100) / 100;
    const internship = pseudoRandom() > 0.55 ? "Yes" : "No";
    const hackathon = pseudoRandom() > 0.65 ? "Yes" : "No";

    // Scoring logic to simulate placement model output
    const score =
      (degree / 100) * 0.25 +
      (dsa / 100) * 0.25 +
      (coding / 100) * 0.15 +
      (aptitude / 100) * 0.15 +
      (comm / 100) * 0.10 +
      (internship === "Yes" ? 0.05 : 0) +
      (hackathon === "Yes" ? 0.05 : 0);

    const isPlaced = score >= 0.52;
    const status = isPlaced ? "Placed" : "Not Placed";
    const probability = Math.min(0.98, Math.max(0.05, score + (pseudoRandom() * 0.1 - 0.05)));

    students.push({
      id,
      age,
      gender,
      degree,
      aptitude,
      comm,
      coding,
      mock,
      attendance,
      projects,
      dsa,
      internship,
      hackathon,
      status,
      probability: Math.round(probability * 100),
    });
  }

  return students;
};

export const INITIAL_STUDENTS = generateStudentsData();

export const MODEL_PERFORMANCE = [
  { model: "Logistic Regression", accuracy: 80.0, precision: 81.03, recall: 83.09, f1: 82.05, time: 0.04, best: true },
  { model: "SVM", accuracy: 80.1, precision: 81.62, recall: 82.36, f1: 81.99, time: 1.30, best: false },
  { model: "Random Forest", accuracy: 77.8, precision: 78.77, recall: 81.64, f1: 80.18, time: 0.35, best: false },
  { model: "Gradient Boosting", accuracy: 77.2, precision: 78.45, recall: 80.73, f1: 79.57, time: 2.73, best: false },
  { model: "KNN", accuracy: 74.5, precision: 76.77, recall: 76.91, f1: 76.84, time: 0.01, best: false },
  { model: "Decision Tree", accuracy: 69.6, precision: 71.35, recall: 74.73, f1: 73.00, time: 0.03, best: false },
];
