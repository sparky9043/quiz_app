import pool from "../../db/pool.ts";
import pwd from "../utils/pwd.ts";

const RAW_PASSWORD = 'password123';

const teacherData = [
  { username: 'ms_rivera' },   // math
  { username: 'mr_okafor' },   // biology
];

// teacherIndex: 0 → first teacher, 1 → second teacher
const studentData = [
  { username: 'alice_chen',    teacherIndex: 0 },
  { username: 'ben_torres',    teacherIndex: 0 },
  { username: 'clara_diallo',  teacherIndex: 0 },
  { username: 'diego_moreau',  teacherIndex: 0 },
  { username: 'elena_park',    teacherIndex: 0 },
  { username: 'farid_haddad',  teacherIndex: 1 },
  { username: 'grace_lindqvist', teacherIndex: 1 },
  { username: 'hana_yoshida',  teacherIndex: 1 },
];

// teacherIndex determines which teacher owns the quiz
const quizData = [
  {
    teacherIndex: 0,
    title: 'Arithmetic Fundamentals',
    questions: [
      {
        content: 'What is 7 × 8?',
        options: [
          { content: '56', is_correct: true },
          { content: '54', is_correct: false },
          { content: '63', is_correct: false },
          { content: '48', is_correct: false },
        ],
      },
      {
        content: 'What is 144 ÷ 12?',
        options: [
          { content: '12', is_correct: true },
          { content: '14', is_correct: false },
          { content: '11', is_correct: false },
          { content: '16', is_correct: false },
        ],
      },
      {
        content: 'What is the value of 3² + 4²?',
        options: [
          { content: '25', is_correct: true },
          { content: '14', is_correct: false },
          { content: '49', is_correct: false },
          { content: '7', is_correct: false },
        ],
      },
      {
        content: 'Which number is prime?',
        options: [
          { content: '17', is_correct: true },
          { content: '21', is_correct: false },
          { content: '27', is_correct: false },
          { content: '33', is_correct: false },
        ],
      },
      {
        content: 'What is 15% of 200?',
        options: [
          { content: '30', is_correct: true },
          { content: '25', is_correct: false },
          { content: '35', is_correct: false },
          { content: '15', is_correct: false },
        ],
      },
    ],
  },
  {
    teacherIndex: 0,
    title: 'Fractions and Decimals',
    questions: [
      {
        content: 'What is 1/2 + 1/4?',
        options: [
          { content: '3/4', is_correct: true },
          { content: '2/6', is_correct: false },
          { content: '1/3', is_correct: false },
          { content: '1/8', is_correct: false },
        ],
      },
      {
        content: 'Simplify 6/8 to its lowest terms.',
        options: [
          { content: '3/4', is_correct: true },
          { content: '2/3', is_correct: false },
          { content: '4/6', is_correct: false },
          { content: '1/2', is_correct: false },
        ],
      },
      {
        content: 'What is 0.25 as a fraction?',
        options: [
          { content: '1/4', is_correct: true },
          { content: '1/2', is_correct: false },
          { content: '2/5', is_correct: false },
          { content: '1/25', is_correct: false },
        ],
      },
      {
        content: 'Which fraction is the largest?',
        options: [
          { content: '7/8', is_correct: true },
          { content: '3/4', is_correct: false },
          { content: '5/8', is_correct: false },
          { content: '2/3', is_correct: false },
        ],
      },
      {
        content: 'What is 2/3 of 9?',
        options: [
          { content: '6', is_correct: true },
          { content: '3', is_correct: false },
          { content: '4', is_correct: false },
          { content: '9', is_correct: false },
        ],
      },
    ],
  },
  {
    teacherIndex: 1,
    title: 'Cell Biology Basics',
    questions: [
      {
        content: 'Which organelle is known as the powerhouse of the cell?',
        options: [
          { content: 'Mitochondria', is_correct: true },
          { content: 'Ribosome', is_correct: false },
          { content: 'Golgi apparatus', is_correct: false },
          { content: 'Lysosome', is_correct: false },
        ],
      },
      {
        content: 'What molecule carries genetic information?',
        options: [
          { content: 'DNA', is_correct: true },
          { content: 'Glucose', is_correct: false },
          { content: 'Cholesterol', is_correct: false },
          { content: 'ATP', is_correct: false },
        ],
      },
      {
        content: 'Which structure is found in plant cells but not animal cells?',
        options: [
          { content: 'Cell wall', is_correct: true },
          { content: 'Nucleus', is_correct: false },
          { content: 'Cell membrane', is_correct: false },
          { content: 'Cytoplasm', is_correct: false },
        ],
      },
      {
        content: 'What is the process by which cells divide to form two identical cells?',
        options: [
          { content: 'Mitosis', is_correct: true },
          { content: 'Meiosis', is_correct: false },
          { content: 'Osmosis', is_correct: false },
          { content: 'Diffusion', is_correct: false },
        ],
      },
      {
        content: 'Where does photosynthesis take place in a plant cell?',
        options: [
          { content: 'Chloroplast', is_correct: true },
          { content: 'Vacuole', is_correct: false },
          { content: 'Nucleus', is_correct: false },
          { content: 'Mitochondria', is_correct: false },
        ],
      },
    ],
  },
  {
    teacherIndex: 1,
    title: 'Human Body Systems',
    questions: [
      {
        content: 'Which organ pumps blood throughout the body?',
        options: [
          { content: 'Heart', is_correct: true },
          { content: 'Liver', is_correct: false },
          { content: 'Lungs', is_correct: false },
          { content: 'Kidney', is_correct: false },
        ],
      },
      {
        content: 'How many bones are in the adult human body?',
        options: [
          { content: '206', is_correct: true },
          { content: '186', is_correct: false },
          { content: '226', is_correct: false },
          { content: '246', is_correct: false },
        ],
      },
      {
        content: 'Which system is responsible for gas exchange?',
        options: [
          { content: 'Respiratory system', is_correct: true },
          { content: 'Digestive system', is_correct: false },
          { content: 'Nervous system', is_correct: false },
          { content: 'Endocrine system', is_correct: false },
        ],
      },
      {
        content: 'What is the largest organ in the human body?',
        options: [
          { content: 'Skin', is_correct: true },
          { content: 'Liver', is_correct: false },
          { content: 'Brain', is_correct: false },
          { content: 'Intestine', is_correct: false },
        ],
      },
      {
        content: 'Which blood cells help fight infection?',
        options: [
          { content: 'White blood cells', is_correct: true },
          { content: 'Red blood cells', is_correct: false },
          { content: 'Platelets', is_correct: false },
          { content: 'Plasma cells', is_correct: false },
        ],
      },
    ],
  },
];

const seed = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Wipe all four tables and reset id sequences back to 1
    await client.query(`
      TRUNCATE options, questions, quizzes, users RESTART IDENTITY CASCADE;
    `);

    // --- Teachers (teacher_id stays NULL) ---
    const teacherIds: number[] = [];

    for (const teacher of teacherData) {
      const passwordHash = await pwd.hash(RAW_PASSWORD);

      const { rows: [insertedTeacher] } = await client.query<{ id: number }>(`
        INSERT INTO users (username, password_hash, type, teacher_id)
        VALUES ($1, $2, 'teacher', NULL)
        RETURNING id;
      `, [teacher.username, passwordHash]);

      teacherIds.push(insertedTeacher.id);
    }

    // --- Students (teacher_id points at one of the teachers above) ---
    for (const student of studentData) {
      const passwordHash = await pwd.hash(RAW_PASSWORD);

      await client.query(`
        INSERT INTO users (username, password_hash, type, teacher_id)
        VALUES ($1, $2, 'student', $3);
      `, [student.username, passwordHash, teacherIds[student.teacherIndex]]);
    }

    // --- Quizzes, questions, options ---
    for (const quiz of quizData) {
      const { rows: [insertedQuiz] } = await client.query<{ id: number }>(`
        INSERT INTO quizzes (teacher_id, title, timestamp)
        VALUES ($1, $2, NOW())
        RETURNING id;
      `, [teacherIds[quiz.teacherIndex], quiz.title]);

      for (const question of quiz.questions) {
        const { rows: [insertedQuestion] } = await client.query<{ id: number }>(`
          INSERT INTO questions (quiz_id, content)
          VALUES ($1, $2)
          RETURNING id;
        `, [insertedQuiz.id, question.content]);

        for (const option of question.options) {
          await client.query(`
            INSERT INTO options (question_id, content, is_correct)
            VALUES ($1, $2, $3);
          `, [insertedQuestion.id, option.content, option.is_correct]);
        }
      }
    }

    await client.query('COMMIT');

    console.log('Seed complete: 10 users (2 teachers, 8 students), 4 quizzes, 20 questions, 80 options');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default seed;

// import pool from "../../db/pool.ts";

// const TEACHER_ID = 1;

// const seedData = [
//   {
//     title: 'Fractions Basics',
//     questions: [
//       {
//         content: 'What is 1/2 + 1/4?',
//         options: [
//           { content: '3/4', is_correct: true },
//           { content: '2/6', is_correct: false },
//           { content: '1/3', is_correct: false },
//           { content: '1/8', is_correct: false },
//         ],
//       },
//       {
//         content: 'What is 3/4 - 1/4?',
//         options: [
//           { content: '1/2', is_correct: true },
//           { content: '1/4', is_correct: false },
//           { content: '2/4', is_correct: false },
//           { content: '3/8', is_correct: false },
//         ],
//       },
//       {
//         content: 'Which fraction is largest?',
//         options: [
//           { content: '7/8', is_correct: true },
//           { content: '1/2', is_correct: false },
//           { content: '3/4', is_correct: false },
//           { content: '5/8', is_correct: false },
//         ],
//       },
//       {
//         content: 'Simplify 6/8',
//         options: [
//           { content: '3/4', is_correct: true },
//           { content: '2/3', is_correct: false },
//           { content: '4/6', is_correct: false },
//           { content: '1/2', is_correct: false },
//         ],
//       },
//       {
//         content: 'What is 2/3 of 9?',
//         options: [
//           { content: '6', is_correct: true },
//           { content: '3', is_correct: false },
//           { content: '9', is_correct: false },
//           { content: '4', is_correct: false },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Intro to Geometry',
//     questions: [
//       {
//         content: 'How many sides does a hexagon have?',
//         options: [
//           { content: '6', is_correct: true },
//           { content: '5', is_correct: false },
//           { content: '7', is_correct: false },
//           { content: '8', is_correct: false },
//         ],
//       },
//       {
//         content: 'What is the sum of angles in a triangle?',
//         options: [
//           { content: '180', is_correct: true },
//           { content: '90', is_correct: false },
//           { content: '360', is_correct: false },
//           { content: '270', is_correct: false },
//         ],
//       },
//       {
//         content: 'A right angle measures how many degrees?',
//         options: [
//           { content: '90', is_correct: true },
//           { content: '45', is_correct: false },
//           { content: '180', is_correct: false },
//           { content: '60', is_correct: false },
//         ],
//       },
//       {
//         content: 'How many faces does a cube have?',
//         options: [
//           { content: '6', is_correct: true },
//           { content: '4', is_correct: false },
//           { content: '8', is_correct: false },
//           { content: '12', is_correct: false },
//         ],
//       },
//       {
//         content: 'Which shape has all equal sides and angles?',
//         options: [
//           { content: 'Square', is_correct: true },
//           { content: 'Rectangle', is_correct: false },
//           { content: 'Rhombus', is_correct: false },
//           { content: 'Trapezoid', is_correct: false },
//         ],
//       },
//     ],
//   },
// ];

// const seed = async () => {
//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     for (const quiz of seedData) {
//       const { rows: [insertedQuiz] } = await client.query<{ id: number }>(`
//         INSERT INTO quizzes (teacher_id, title, timestamp)
//         VALUES ($1, $2, NOW())
//         RETURNING id;
//       `, [TEACHER_ID, quiz.title]);

//       for (const question of quiz.questions) {
//         const { rows: [insertedQuestion] } = await client.query<{ id: number }>(`
//           INSERT INTO questions (quiz_id, content)
//           VALUES ($1, $2)
//           RETURNING id;
//         `, [insertedQuiz.id, question.content]);

//         for (const option of question.options) {
//           await client.query(`
//             INSERT INTO options (question_id, content, is_correct)
//             VALUES ($1, $2, $3);
//           `, [insertedQuestion.id, option.content, option.is_correct]);
//         }
//       }
//     }

//     await client.query('COMMIT');
//     console.log('Seed complete: 2 quizzes, 10 questions, 40 options');
//   } catch (error) {
//     await client.query('ROLLBACK');
//     throw error;
//   } finally {
//     client.release();
//   }
// };

// export default seed;