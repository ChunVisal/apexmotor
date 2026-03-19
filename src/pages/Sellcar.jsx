// src/pages/Sellcar.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore" ;
import { db } from "../firebase/firebase";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useSold } from "../context/SoldContext";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { PhotoIcon, TrashIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { FiTrash2 } from "react-icons/fi";
import { FaCarSide, FaEdit } from "react-icons/fa";
import CustomDropdown from "../components/common/SellDropdown"; // Use the new CustomDropdown
import LocationPicker from "../components/common/LocationPicker";
import { carBrands, carModels, carBodyTypes } from "../data/carData";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SellYourCar = () => {
  const { user } = useAuth();
  const { userId, carId } = useParams();
  const navigate = useNavigate();
  const { soldCars, error, refreshSoldCars } = useSold();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmingId, setConfirmingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [newFeature, setNewFeature] = useState('');
  const [features, setFeatures] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState([]);

  const featureInputRef = useRef(null);
  const optionInputRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [images, setImages] = useState([]);  
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [] = useState([]);
  const [] = useState([]);
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);
  const [isPlate, setIsPlate] = useState(false);
  const [contactNumbers, setContactNumbers] = useState([]);
  const [] = useState("");
  const [] = useState("");
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    type: "",
    year: "",
    price: "",
    originalPrice: "",
    condition: "",
    mileage: "",
    transmission: "",
    plate: "",
    drivetrain: "",
    exteriorColor: "",
    interiorColor: "",
    delivery: "",
    engine: "",
    horsepower: "",
    torque: "",
    description: "",
    vin: "",
    features: [],
    options: [],
    createdAt: serverTimestamp(),
  });

  const modelsForBrand = carModels[watch('name')] || [];

  // Handlers for adding and removing Features
  const handleAddFeature = () => {
      if (newFeature.trim() !== '') {
        setFeatures([...features, newFeature.trim()]);
        setNewFeature('');
        if (featureInputRef.current) {
          featureInputRef.current.focus();
        }
      }
    };  

    const handleRemoveFeature = (indexToRemove) => {
      setFeatures(features.filter((_, index) => index !== indexToRemove));
    };

    // Handlers for adding and removing Options
    const handleAddOption = () => {
      if (newOption.trim() !== '') {
        setOptions([...options, newOption.trim()]);
        setNewOption('');
        if (optionInputRef.current) {
          optionInputRef.current.focus();
        }
      }
    };

    const handleRemoveOption = (indexToRemove) => {
      setOptions(options.filter((_, index) => index !== indexToRemove));
    };

  useEffect(() => {
    if (carId && userId === user?.uid) {
      setIsEditing(true);
      const fetchCarData = async () => {
        try {
          const docRef = doc(db, "carsUser", userId, "cars", carId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const populatedData = {
              name: data.name || "",
              model: data.model || "",
              type: data.type || "",
              year: data.year || "",
              price: data.price || "",
              originalPrice: data.originalPrice || "",
              condition: data.condition || "",
              mileage: data.mileage || "",
              transmission: data.transmission || "",
              plate: data.plate || "",
              drivetrain: data.drivetrain || "",
              exteriorColor: data.exteriorColor || "",
              interiorColor: data.interiorColor || "",
              delivery: data.delivery || false,
              engine: data.engine || "",
              horsepower: data.horsepower || "",
              torque: data.torque || "",
              description: data.description || "",
              vin: data.vin || "",
              features: data.features || [],
              options: data.options || [],
              location: data.location || null,       
              locationName: data.locationName || "",
              status: data.status || "available",
            };
            reset(populatedData);
            setFormData(populatedData);
            setContactNumbers(data.contactNumbers || []);
            setLocation(data.location || null);
            setLocationName(data.locationName || "");
            setIsFreeDelivery(data.delivery === true || data.delivery === "Free delivery");
            setIsPlate(!!data.plate);
            setFormData(populatedData);

            setImages(data.images || []);
            setFilesToUpload([]);
          } else {
            console.error("No such car found!");
            navigate("/sellcar"); // Redirect if car not found
          }
        } catch (e) {
          console.error("Error fetching car data:", e);
          navigate("/sellcar");
        }
      };
      fetchCarData();
    } else {
      setIsEditing(false);
      reset(); // Reset form for new car listing
      setFormData({
        name: "",
        model: "",
        type: "",
        year: "",
        price: "",
        originalPrice: "",
        condition: "",
        mileage: "",
        transmission: "",
        plate: "",
        drivetrain: "",
        exteriorColor: "",
        interiorColor: "",
        delivery: "",
        engine: "",
        horsepower: "",
        torque: "",
        description: "",
        vin: "",
        features: [],
        options: [],
        createdAt: serverTimestamp() 
      });
      setImages([]);
      setFilesToUpload([]);
      setContactNumbers([]);
      setLocationName("");
      setLocation(null);
      setIsFreeDelivery(false);
      setIsPlate(false);
    }
  }, [carId, userId, user, navigate, reset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name, option) => {
    const value = typeof option === 'object' ? option.name : option;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValue(name, value);
  };
  
  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    if (images.length + filesToUpload.length + newFiles.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }
    const tempUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...tempUrls]);
    setFilesToUpload((prev) => [...prev, ...newFiles]);
  };

  
  const removeImage = (indexToRemove) => {
    const isNewImage = indexToRemove >= images.length - filesToUpload.length;
    if (isNewImage) {
      const fileIndex = indexToRemove - (images.length - filesToUpload.length);
      setFilesToUpload((prev) => prev.filter((_, i) => i !== fileIndex));
    }
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

   const onSubmit = async (data) => {
    setLoading(true);
    setProgress(0);

    let simulatedProgress = 0;
    const interval = setInterval(() => {
      simulatedProgress += 10; // increase 10% every 200ms
      setProgress(simulatedProgress);
      if (simulatedProgress >= 100) {
        clearInterval(interval);
        setLoading(false);
        setProgress(0);
        // ✅ Do your real submit logic here, like saving to Firebase
        console.log("Form submitted!", data);
      }
    }, 200);
    

    if (images.length === 0) {
      alert("Please upload at least one photo.");
      return;
    }

    const cloudName = "dwwsvsah5";
    const uploadPreset = "apexmotor-upload";
    
    // START: Photo upload logicz
    const uploadedImageUrls = [];
    try {
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", `cars/${user.uid}`);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        uploadedImageUrls.push(response.data.secure_url);
      }
    } catch (err) {
      console.error("❌ Error uploading images:", err);
      alert("Failed to upload images. Please try again.");
      return;
    }

    // Combine old and new image URLs
    const finalImageUrls = images.filter(url => !url.startsWith("blob:")).concat(uploadedImageUrls);
    // END: Photo upload logic

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || "Unnamed",
          createdAt: new Date(),
        });
      }
      const safeUsername =
        (userSnap.exists() && userSnap.data()?.username) ||
        user.displayName ||
        (user.email ? user.email.split("@")[0] : "Unnamed");

      const carData = {
        ...data,
        features,
        options,
        contactNumbers,
        location,
        images: finalImageUrls, // Use the final list of URLs
        userId: user.uid,
        uploaderEmail: user.email || "",
        uploaderUsername: safeUsername || "",
        status: isEditing ? formData.status : "available",
        locationName: locationName || (Array.isArray(location) ? `${location[0].toFixed(4)}, ${location[1].toFixed(4)}` : "")
      };

      console.log("🚗 Final carData about to save:", carData);

      if (isEditing) {
        const docRef = doc(db, "carsUser", user.uid, "cars", carId);
        await setDoc(docRef, { ...carData, updatedAt: new Date() }, { merge: true }); // FIX: Use { merge: true }
        const savedSnap = await getDoc(docRef);
        console.log("✅ Saved (updated) doc:", savedSnap.data());
        try { sessionStorage.removeItem("cars-data"); } catch(e) {}
        refreshSoldCars();
        alert("✅ Car listing updated successfully!");
        navigate("/sold");
      } else {
        const newCarId = crypto.randomUUID();
        const docRef = doc(db, "carsUser", user.uid, "cars", newCarId);
        await setDoc(docRef, { ...carData, createdAt: new Date() });
        const savedSnap = await getDoc(docRef);
        console.log("✅ Saved (new) doc:", savedSnap.data());
        try { sessionStorage.removeItem("cars-data"); } catch(e) {}
        refreshSoldCars();
        alert("✅ Car listed successfully!");
        navigate("/SuccessSold", {
          state: { user: { email: user.email, uid: user.uid }, car: carData },
        });
      }

      reset();
      setFeatures([]);
      setOptions([]);
      setContactNumbers([]);
      setLocation(null);
      setImages([]);
      setFilesToUpload([]);
      setLocationName("");
      setIsFreeDelivery(false);
      setIsPlate(false);

    } catch (err) {
      console.error("❌ Error adding/updating car:", err);
      alert("Failed to save car. Please try again.");
    }
  };

  const handleShowDeleteConfirm = (id) => {
    setConfirmingId(id);
  };

  const handleDelete = async () => {
    if (!user || !confirmingId) return;
    try {
      await deleteDoc(doc(db, "carsUser", user.uid, "cars", confirmingId));
      setConfirmingId(null);
      setMessage({ text: "Car deleted successfully.", type: "success" });
      refreshSoldCars();
    } catch (e) {
      console.error("❌ Delete failed:", e);
      setConfirmingId(null);
      setMessage({ text: "Failed to delete car. Please try again.", type: "error" });
    }
  };

  // Hardcoded values from your provided files
  const conditions = ["New", "Used"];
  const transmissions = ["Auto", "Manual"];
  const drivetrains = ["AWD", "FWD", "RWD"];

  return (
    <section className="bg-gray-50 text-gray-900 p-6 px-3 sm:p-10 sm:px-20 font-sans min-h-screen">
            <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Your Listings</h1>
        <p className="text-gray-500 mb-8 sm:mb-12">
          Manage your current car listings or create a new one to sell on ApexMotor.
        </p>

        {/* Sold Cars List Section */}
        <div className="border-2 rounded-md border-gray-200 bg-gray-100 p-5 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-base text-gray-900 flex items-center">
                <FaCarSide className="text-blue-500 mr-2" />
                Sold Vehicles
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {soldCars.length} {soldCars.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white w-full rounded-sm shadow-sm p-3 py-2 animate-pulse">
                  <div className="relative">
                    <div className="w-full h-32 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="text-red-500">
              <p>Error: {error}</p>
            </div>
          )}
          {!loading && !error && (
            <>
              {soldCars.length === 0 ? (
                <div className="bg-white rounded shadow p-8 text-center">
                  <FaCarSide className="mx-auto text-3xl text-gray-300 mb-3" />
                  <h3 className="text-base font-medium text-gray-900 mb-1">No cars sold yet.</h3>
                  <p className="text-gray-500 text-sm mb-4">When you list a car for sale, it will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {soldCars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-white w-full rounded-sm shadow-sm hover:shadow-md transition-shadow relative"
                    >
                      <Link to={`/car/${car.userId}/${car.id}`}>
                        <div className="relative">
                          <img
                            src={car.images?.[0] || "https://via.placeholder.com/150"}
                            alt={`${car.name} ${car.model}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            SOLD
                          </div>
                        </div>
                      </Link>
                      <div className="p-3 py-2 text-gray-800">
                        <div className="flex gap-2 items-center mt-1">
                          <h3 className="text-sm font-base truncate">
                            {car.name} {car.model}
                          </h3>
                          <p className="text-sm text-gray-500">{car.year}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-red-600">$ {car.price}</span>
                        </div>
                      </div>
                      <div className="">
                        <Link 
                          to={`/edit-car/${user.uid}/${car.id}`}
                          className="absolute top-2 right-10 bg-yellow-500 hover:bg-yellow-500 text-white p-1.5 rounded">
                          <FaEdit size={14} /> 
                        </Link>
                        <button
                          onClick={() => handleShowDeleteConfirm(car.id)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sell/Edit Car Form Section */}
        <div className="border-2 rounded-md border-gray-200 bg-gray-100 p-5">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
            {isEditing ? "Edit Your Car" : "List Your Car"}
          </h1>
          <p className="text-gray-500 mb-8 sm:mb-12">
            Fill out the details below to {isEditing ? "update your vehicle listing" : "list your vehicle for sale"} on ApexMotor.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div>
              <h2 className="text-1xl font-base mb-4">Basic Car Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Brand</label>
                  <CustomDropdown
                    options={carBrands}
                    placeholder="Select Brand"
                    onChange={(val) => handleDropdownChange("name", val)}
                    value={formData.name}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Model</label>
                  <CustomDropdown
                    options={modelsForBrand}
                    placeholder="Select Model"
                    onChange={(val) => handleDropdownChange("model", val)}
                    value={formData.model}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Types</label>
                  <CustomDropdown
                    options={carBodyTypes}
                    placeholder="Select Body Type"
                    onChange={(val) => handleDropdownChange("type", val)}
                    value={formData.type}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Year</label>
                  <input
                    type="text"
                    name="year"
                    {...register("year", { required: true, pattern: /^\d{4}$/ })}
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="e.g., 2024"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.year && <span className="text-red-500 text-xs mt-1">Year must be 4 digits.</span>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Condition</label>
                  <CustomDropdown
                    options={conditions}
                    placeholder="Select Condition"
                    onChange={(val) => handleDropdownChange("condition", val)}
                    value={formData.condition}
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-1xl font-base mb-4">Pricing & Mileage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Price Discount (USD)</label>
                  <input
                    type="text"
                    name="price"
                    {...register("price", { required: true, pattern: /^\d+(\.\d{1,2})?$/ })}
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 120,900"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.price && <span className="text-red-500 text-xs mt-1">Price must be a number.</span>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Original Price (optional)</label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="e.g., 122,600"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Mileage (KM)</label>
                  <input
                    type="text"
                    name="mileage"
                    {...register("mileage", { required: true, pattern: /^\d+$/ })}
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="e.g., 12,000"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.mileage && <span className="text-red-500 text-xs mt-1">Mileage must be a number.</span>}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-1xl font-base mb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Transmission</label>
                  <CustomDropdown
                    options={transmissions}
                    placeholder="Select Transmission"
                    onChange={(val) => handleDropdownChange("transmission", val)}
                    value={formData.transmission}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Drivetrain</label>
                  <CustomDropdown
                    options={drivetrains}
                    placeholder="Select Drivetrain"
                    onChange={(val) => handleDropdownChange("drivetrain", val)}
                    value={formData.drivetrain}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Exterior Color</label>
                  <input
                    type="text"
                    name="exteriorColor"
                    value={formData.exteriorColor}
                    onChange={handleChange}
                    placeholder="e.g., Alpine White"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Interior Color</label>
                  <input
                    type="text"
                    name="interiorColor"
                    value={formData.interiorColor}
                    onChange={handleChange}
                    placeholder="e.g., Sakhir Orange"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium mb-1">Engine</label>
                  <input
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleChange}
                    placeholder="e.g., 4.4-liter TwinPower Turbo V8"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Horsepower (HP)</label>
                  <input
                    type="text"
                    name="horsepower"
                    value={formData.horsepower}
                    onChange={handleChange}
                    placeholder="e.g., 617 HP"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Torque (lb-ft)</label>
                  <input
                    type="text"
                    name="torque"
                    value={formData.torque}
                    onChange={handleChange}
                    placeholder="e.g., 553 lb-ft"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    {...register("description", { required: true, minLength: 30 })}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="A detailed description of your car..."
                    rows="4"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.description && <span className="text-red-500 text-xs mt-1">Description must be at least 30 characters.</span>}
                </div>
              </div>
              {/* features and option */}
              <div className="">
                <h2 className="text-1xl font-semibold my-5">Features & Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
            <label className="text-sm font-medium mb-2">Features</label>
            <div className="flex items-center gap-2">
              <input
                ref={featureInputRef}
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                className="flex-1 border border-gray-300 placeholder:text-sm rounded-lg p-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#2384C1] transition-colors"
                placeholder="e.g., GPS Navigation"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-[#2384C1] text-white font-xs font-base p-1 px-3 rounded-md shadow-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {features.length > 0 && (
              <ul className="mt-4 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 p-1 border-y-2 border-gray-300  text-gray-800">
                    <span>{feature}</span>
                    <button type="button" onClick={() => handleRemoveFeature(index)}>
                      <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Options Input */}
          <div>
            <label className="font-sm font-medium mb-2">Options</label>
            <div className="flex items-center gap-2">
              <input
                ref={optionInputRef}
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                className="flex-1 border border-gray-300 rounded-lg p-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#2384C1] transition-colors"
                placeholder="e.g., Heated seats"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-[#2384C1] text-white font-base p-1 px-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {options.length > 0 && (
              <ul className="mt-4 space-y-2">
                {options.map((option, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-gray-800">
                    <span>{option}</span>
                    <button type="button" onClick={() => handleRemoveOption(index)}>
                      <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
              </div>
              </div>
            </div>
            <div
                className="relative"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  handleImageUpload({ target: { files } });
                }}
                onPaste={(e) => {
                  const items = e.clipboardData.items;
                  const files = [];
                  for (let i = 0; i < items.length; i++) {
                    if (items[i].type.startsWith("image")) {
                      files.push(items[i].getAsFile());
                    }
                  }
                  if (files.length > 0) {
                    handleImageUpload({ target: { files } });
                  }
                }}
              >
                <h2 className="text-1xl font-base mb-4">Vehicle Photos</h2>
                <p className="text-sm text-gray-500 mb-4">Add up to 10 high-quality photos of your car.</p>

                <div className="flex flex-wrap gap-4">
                  <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 w-40 h-32 flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Add Photos</span>
                  </label>

                  {images.map((img, index) => (
                    <div key={index} className="relative w-40 h-32 rounded-lg overflow-hidden group">
                      <img
                        src={img}
                        alt={`Car photo ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setFullScreenImage(img)}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-opacity-80 transition-opacity"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            {fullScreenImage && (
              <div
              className="fixed top-0 left-0 w-full h-full bg-gray bg-opacity-70 flex justify-center items-center z-50 cursor-pointer"
              onClick={() => setFullScreenImage(null)}
              >
              <img
              src={fullScreenImage}
              alt="Full size car photo"
              className="max-w-3xl max-h-screen object-contain"
              onClick={(e) => e.stopPropagation()}
              />
              </div>
              )}
            <div>
              <h2 className="text-1xl font-base mb-4">Seller Details & Location</h2>
              <div className="flex flex-col mb-6">
                <label className="text-sm font-medium mb-3">More Option</label>
                <div className="sm:flex sm:space-x-10 space-y-3 sm:space-y-0 sm:mx-5">
               <button
                  type="button"
                  onClick={() => {
                    const newState = !isFreeDelivery;
                    setIsFreeDelivery(newState);
                    setValue("delivery", newState);
                  }}
                  className={`w-full text-sm font-medium py-1.5 px-4 rounded-lg border transition-colors ${
                    isFreeDelivery
                      ? "bg-[#2384C1] text-white border-transparent hover:bg-blue-700"
                      : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                  }`}
                >
                  {isFreeDelivery ? "✓ Free Delivery Selected" : "Offer Free Delivery?"}
                </button>
                <button
                   type="button"
                   onClick={() => {
                     setIsPlate(!isPlate);
                     setFormData((prev) => ({ ...prev, plate: isPlate ? "" : "With Plate" }));
                   }}
                   className={`w-full text-sm font-medium py-1.5 px-4 rounded-lg border transition-colors ${
                     isPlate
                       ? "bg-[#2384C1] text-white border-transparent hover:bg-blue-700"
                       : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                   }`}
                 >
                   {isPlate ? "✓ Plate Number Added" : "Include Plate Number?"}
                 </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-medium mb-2">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  Car Location
                </label>
                <p className="text-sm text-gray-500 mb-2">Click on the map to set the exact location of your vehicle.</p>
              </div>
              <div className="h-[300px] w-full rounded-lg overflow-hidden shadow-inner border border-gray-200">
                <MapContainer
                  center={location || [11.5564, 104.9282]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {/* ✅ Pass both setters to the new component */}
                  <LocationPicker setLocation={setLocation} setLocationName={setLocationName} />
                  {location && <Marker position={location}></Marker>}
                </MapContainer>
              </div> 
              {/* ✅ Display the new locationName instead of the coordinates */}
              {location && (
                <p className="text-sm text-gray-500 mt-2">
                  📍 Selected Location: {locationName}
                </p>
              )}
            </div>
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#2384C1] text-white font-bold tracking-wide text-sm sm:text-base p-1 sm:py-2 sm:px-2 rounded-lg shadow-md transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
              >
                {loading ? "Uploading..." : isEditing ? "Update Car Listing" : "Submit Car Listing"}
              </button>

              {loading && (
                <div className="w-full h-2 bg-gray-200 rounded mt-2">
                  <div
                    className="h-2 bg-green-500 rounded transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      
      {confirmingId && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-bold mb-2">Delete Car?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this car? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmingId(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
      
      {message && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center ${
              message.type === "success" ? "border-t-4 border-green-500" : "border-t-4 border-red-500"
            }`}
          >
            <p className="text-sm text-gray-600 mb-4">{message.text}</p>
            <button
              onClick={() => setMessage(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellYourCar;