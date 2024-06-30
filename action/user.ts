"use server";

import { signIn, signOut } from "@/auth";
import { AddUserParams, Driver, User } from "@/types";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase-admin/auth";
import { collection, getDocs } from "firebase/firestore";

export async function doLogout() {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });
}

export async function doCredentialLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return response;
}

export async function getAllUsers() {
  try {
    const getUsers = await getAuth().listUsers();
    const users: User[] = getUsers.users.map((userRecord) => {
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        role: userRecord.customClaims?.role,
        lastSignInTime: userRecord.metadata.lastSignInTime,
      };
    });

    return users;
  } catch (error) {
    console.log("Error listing users:", error);
  }
}

export async function createUserWithRole({
  email,
  password,
  name,
  role,
}: AddUserParams) {
  const userRecord = await getAuth().createUser({
    email: email,
    emailVerified: false,
    password: password,
    displayName: name,
    disabled: false,
  });
  console.log("Successfully created new user:", userRecord.uid);

  if (userRecord) {
    try {
      await getAuth().setCustomUserClaims(userRecord.uid, { role: role });
    } catch (error) {
      console.log("error on claiming: ", error);
    }
  }

  return userRecord.toJSON();
}

export async function updateUser(uid: string, data: AddUserParams) {
  let newData: {
    email: string;
    displayName: string;
    password?: string;
  } = {
    email: data.email,
    displayName: data.name,
  };

  if (data.password) {
    newData.password = data.password;
  }

  const userRecord = await getAuth().updateUser(uid, newData);

  if (userRecord) {
    try {
      await getAuth().setCustomUserClaims(uid, { role: data.role });
    } catch (error) {
      console.log("error on claiming: ", error);
    }
  }

  return userRecord.toJSON();
}

export async function deleteUser(uid: string) {
  await getAuth().deleteUser(uid);
}

export async function getDrivers() {
  const querySnapshot = await getDocs(collection(db, "users"));

  const drivers: Driver[] = querySnapshot.docs.map((doc) => {
    return {
      name: doc.data().name,
      notification_token: doc.data().notification_token,
    } as Driver;
  });

  return drivers;
}

export async function sendNotification(token: string, shipment: string) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    body: JSON.stringify({
      to: token,
      title: "Shipment Baru",
      body: "Ada shipment yang harus diantar!",
      data: {
        shipment: shipment,
      },
    }),
  });
}
