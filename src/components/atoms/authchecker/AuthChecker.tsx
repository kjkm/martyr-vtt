import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { setUser } from "../../../state/user/userSlice";

const AuthChecker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(setUser({ id: user.uid, name: userData.username }));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthChecker;