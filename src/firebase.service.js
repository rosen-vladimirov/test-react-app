import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, onValue, push, update } from "firebase/database";

class FirebaseService {
    firebaseConfig = {
        apiKey: "AIzaSyA5Og8fwj8qlPfrTX2FZKSlP3R4xqGi9d4",
        authDomain: "students-88274.firebaseapp.com",
        projectId: "students-88274",
        storageBucket: "students-88274.appspot.com",
        messagingSenderId: "1041934476796",
        appId: "1:1041934476796:web:85f2f00462b55d175b7e79",
        measurementId: "G-Q6M4M22ZZV",
        databaseURL: "https://students-88274-default-rtdb.europe-west1.firebasedatabase.app/"
    };

    constructor() {
        initializeApp(this.firebaseConfig);
    }

    async getQuestionForCurrentUser() {
        const questions = await this.getQuestions();
        const answeredQuestions = localStorage.getItem("answeredQuestions");
        console.log(questions);
        return questions[0];
    }


    writeNewUser(name, email) {
        const db = getDatabase();

        // A post entry.
        const postData = {
            email,
            name,
            answeredQuestions: {
                randomId: {
                    questionId: "124",
                    isCorrect: true
                }
            }
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'users')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/users/' + newPostKey] = postData;

        return update(ref(db), updates);
    }

    getQuestions() {
        const dbRef = ref(getDatabase());
        return get(child(dbRef, `/questions`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.toJSON();
                    // root.render(<Survey model={survey} onValidateQuestion={surveyValidateQuestion} />)
                } else {
                    throw new Error("Unable to get data from Firebase");
                }
            });
    }
}

export { FirebaseService };
