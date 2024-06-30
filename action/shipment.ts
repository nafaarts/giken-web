"use server";

import { Shipment } from "@/types";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

const getShipments = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "shipments"), orderBy("date", "desc"))
  );

  const shipments: Shipment[] = querySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data(),
    } as Shipment;
  });

  return shipments;
};

const getShipmentById = async (uid: string) => {
  const docRef = doc(db, "shipments", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      uid: docSnap.id,
      ...docSnap.data(),
    } as Shipment;
  } else {
    console.log("No such document!");
  }
};

const createShipment = async (shipment: Shipment) => {
  const docRef = await addDoc(collection(db, "shipments"), shipment);
  console.log("Document written with ID: ", docRef.id);

  return docRef.id;
};

const updateShipment = async (uid: string, shipment: any) => {
  await setDoc(doc(db, "shipments", uid), shipment, { merge: true });
  console.log("Document successfully updated!");
};

const deleteShipment = async (uid: string) => {
  await deleteDoc(doc(db, "shipments", uid));
  console.log("Document successfully deleted!");
};

export {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment,
};
