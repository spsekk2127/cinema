import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ticketsData } from "@/data/tickets";
import { moviesData } from "@/data/movieData";
import { theatersData } from "@/data/theaters.js";
import { showtimesData } from "@/data/showtimes.js";
import { usersData } from "@/data/users.js";
import { bookingsData } from "@/data/bookings.js";
import { NextResponse } from "next/server";

async function uploadCollectionData(collectionName, data) {
  try {
    const dbCollection = collection(db, collectionName);

    // check if collection data already exists
    const existingData = await getDocs(dbCollection);
    if (!existingData.empty) {
      return ({
        success: false,
        message: `${collectionName} already exists`,
        count: existingData.size,
      });
    }

    // write data to firestore
    const results = [];
    for (const item of data) {
      await setDoc(doc(db, collectionName, item.id), {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      results.push(item);
    }

    return ({
      success: true,
      message: `${collectionName} data set successfully`,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error(`Error initializing ${collectionName} data:`, error);
    return ({
      success: false,
      message: `Failed to set ${collectionName} data`,
      error: error.message,
    });
  }
}

export async function GET() {
  try {
    // upload data to firestore
    const results = {
      tickets: await uploadCollectionData("tickets_Data", ticketsData),
      movies: await uploadCollectionData("movies_Data", moviesData),
      theaters: await uploadCollectionData("theaters_Data", theatersData),
      showtimes: await uploadCollectionData("showtimes_Data", showtimesData),
      users: await uploadCollectionData("users_Data", usersData),
      bookings: await uploadCollectionData("bookings_Data", bookingsData),
    };

    // check if any data failed to upload
    const hasErrors = Object.values(results).some((result) => !result.success);
    console.log(results);
    if (hasErrors) {
      return NextResponse.json(
        {
          message: "Failed to upload data",
          results,
        },
        {
          status: 500,
        }
      );
    }

    // return success results
    return NextResponse.json({
      message: "All data uploaded successfully",
      results,
    });
  } catch {
    console.error("Error in data initialization:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize data",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
