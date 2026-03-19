const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./apexmotor-8a781-firebase-adminsdk-fbsvc-dca57e0252.json");

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixAllCars() {
  console.log("🔥 Fetching all users from the 'carsUser' collection...");

  // ✅ THIS IS THE FINAL CORRECT PATH!
  const usersSnapshot = await db.collection("carsUser").get();
  console.log(`✅ Success! Found ${usersSnapshot.size} users.`);

  let totalCars = 0;
  let totalFixed = 0;

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    // ✅ And this is the correct sub-collection, which you already had!
    const carsSnapshot = await db.collection("carsUser").doc(userId).collection("cars").get();
    console.log(` - User ${userId} has ${carsSnapshot.size} cars`);

    for (const carDoc of carsSnapshot.docs) {
      totalCars++;
      const data = carDoc.data();
      if (!data.status || data.status === "") {
        await carDoc.ref.update({ status: "available" });
        totalFixed++;
        console.log(`   ✅ Fixed car ${carDoc.id}`);
      }
    }
  }

  console.log(`🎉 Total cars found: ${totalCars}`);
  console.log(`🎉 Total cars fixed: ${totalFixed}`);
}

fixAllCars();