// src/data/cars.js
import News_m8 from "../assets/images/news/bmwm8.png";
import News_is500 from "../assets/images/news/lexusis500.png";
import News_sclassc63 from "../assets/images/news/sclassC63.png";
import News_porsche911 from "../assets/images/news/porsche911.png"; 

import bmw_m8 from "../assets/images/bmw_m8.jpg";
import audi_rs7 from "../assets/images/audi_rs7.jpg";
import lambo_sv from "../assets/images/lamborghini_sv.jpg";
import porsche_s from "../assets/images/porsche_turbos.jpg";
import Amg_c63 from "../assets/images/Amg_c63.jpg";

export const cars = [
  { 
    img: bmw_m8,
    id: "1",
    year: "2025",
    location: "Phnom Penh",
    name: "BMW",
    model: "M8 Competition",
    type: "Premium Coupe",
    price: "120,900",
    originalPrice: "122,600",
    condition: "New",
    delivery: "Available",
    trade: "Available",
    mileage: "12,000 KM",
    transmission: "Auto",
    drivetrain: "AWD",
    exteriorColor: "Alpine White",
    interiorColor: "Black",
    vin: "WBASA3C52RP502401",
    engine: "4.4-liter TwinPower Turbo V8 Engine",
    horsepower: "617 HP",
    torque: "553 lb-ft",
    description: "The BMW M8 Competition Coupe is a high-performance sports car that combines a luxurious interior with a powerful V8 engine. It features an M xDrive all-wheel-drive system and an M Sport Differential for superior handling and stability, a 4.4-liter twin-turbo V8 engine with 617 horsepower, and a host of advanced features that make it one of the most desirable cars on the road today. A truly exceptional driving experience.",
    features: [
      "Heated Seats",
      "Backup Camera",
      "Surround Sound System",
      "M Sport Differential & Adaptive M Suspension",
      "Advanced Driver-Assistance Systems (ADAS)",
      "Luxurious Interior with Merino Leather"
    ],
    options: [
      "Navigation System",
      "Apple CarPlay",
      "Dual Zone Climate Control",
      "Keyless Entry",
      "Leather Steering Wheel"
    ],
    seller: {
      name: "Premium Auto Sales",
      address: "123 Street 456, Phnom Penh, Cambodia",
      phone: "+855 12 345 678",
      email: "narthan@premiumauto.com"
    },
    images: [
      bmw_m8,
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+3",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+4"
    ]
  },
  {
    id: "2",
    year: "2025",
    location: "Phnom Penh",
    name: "Audi",
    model: "RS7 Sportback",
    type: "Sportback",
    price: "130,000",
    originalPrice: "132,500",
    condition: "New",
    delivery: "Available",
    mileage: "0 KM",
    transmission: "8-speed Tiptronic",
    drivetrain: "Quattro AWD",
    exteriorColor: "Nardo Gray",
    interiorColor: "Black with Red Stitching",
    vin: "WAUZZZ4K7MAXXXXXX",
    engine: "4.0-liter Twin-Turbo V8 Engine",
    horsepower: "591 HP",
    torque: "590 lb-ft",
    description: "The Audi RS7 Sportback combines the performance of a supercar with the everyday usability of a luxury sedan. Its powerful twin-turbo V8 engine and legendary Quattro all-wheel drive system deliver a thrilling driving experience, while its sleek design and advanced technology set it apart from the competition.",
    features: [
      "Quattro All-Wheel Drive with Sport Differential",
      "RS-tuned Adaptive Air Suspension",
      "Matrix-design LED headlights",
      "Virtual Cockpit Plus",
      "Bang & Olufsen 3D Advanced Sound System"
    ],
    options: [
      "Dynamic Package",
      "Black Optic Package",
      "Carbon Fiber Exterior Trim",
      "Head-up Display"
    ],
    seller: {
      name: "Audi Phnom Penh",
      address: "456 Street 789, Phnom Penh, Cambodia",
      phone: "+855 23 456 789",
      email: "info@audicambodia.com"
    },
    images: [
      audi_rs7,
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+3"
    ]
  },
  {
    id: "3",
    year: "2024",
    location: "Phnom Penh",
    name: "Tesla",
    model: "Model S Plaid",
    type: "Electric Sedan",
    price: "145,000",
    originalPrice: "148,000",
    condition: "New",
    delivery: "Available",
    mileage: "500 KM",
    transmission: "Single-speed fixed gear",
    drivetrain: "Tri-Motor AWD",
    exteriorColor: "Midnight Silver Metallic",
    interiorColor: "Black and White",
    vin: "5YJSA1E21NFXXXXXX",
    engine: "Tri-Motor All-Wheel Drive",
    horsepower: "1020 HP",
    torque: "1050 lb-ft",
    description: "The Model S Plaid is an all-electric high-performance sedan that delivers breathtaking acceleration and a long range. With its futuristic design, minimalist interior, and a 17-inch cinematic display, it redefines the driving experience.",
    features: [
      "1020 Horsepower Tri-Motor All-Wheel Drive",
      "0-60 mph in 1.99s",
      "17-inch Cinematic Display",
      "Yoke Steering Wheel",
      "22-speaker audio system"
    ],
    options: [
      "Full Self-Driving Capability",
      "Carbon Fiber Spoiler",
      "21-inch Arachnid Wheels"
    ],
    seller: {
      name: "Future Cars Cambodia",
      address: "789 Street 101, Phnom Penh, Cambodia",
      phone: "+855 88 777 8888",
      email: "sales@futurecars.kh"
    },
    images: [
      "https://placehold.co/600x400/000000/FFFFFF?text=Tesla+Model+S+Plaid",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+3"
    ]
  },
  {
    id: "4",
    year: "2025",
    location: "Phnom Penh",
    name: "Lamborghini",
    model: "Aventador SV",
    type: "Supercar",
    price: "500,000",
    originalPrice: "520,000",
    condition: "Used",
    delivery: "Unavailable",
    mileage: "5,000 KM",
    transmission: "7-speed ISR",
    drivetrain: "AWD",
    exteriorColor: "Verde Ithaca",
    interiorColor: "Nero Cosmus",
    vin: "ZHWSA7F65JGAXXXXXX",
    engine: "6.5-liter Naturally Aspirated V12 Engine",
    horsepower: "740 HP",
    torque: "509 lb-ft",
    description: "The Lamborghini Aventador SV (SuperVeloce) is a track-focused beast. With its powerful V12 engine, aggressive aerodynamics, and a lightweight carbon fiber monocoque, it's designed for pure, unadulterated performance.",
    features: [
      "740 Horsepower Naturally Aspirated V12 Engine",
      "Lightweight Carbon Fiber Monocoque",
      "Push-rod Suspension System",
      "Fixed Carbon Fiber Rear Wing",
      "Carbon Ceramic Brakes"
    ],
    options: [
      "Transparent Engine Bonnet",
      "Dianthus Forged Wheels",
      "Branding Package"
    ],
    seller: {
      name: "Luxury Exotic Motors",
      address: "12A Street 5B, Phnom Penh, Cambodia",
      phone: "+855 99 123 456",
      email: "sales@luxuryexotic.kh"
    },
    images: [
      lambo_sv,
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+3"
    ]
  },
  {
    id: "5",
    year: "2025",
    location: "Phnom Penh",
    name: "Porsche",
    model: "911 Turbo S",
    type: "Sport Coupe",
    price: "230,000",
    originalPrice: "235,000",
    condition: "New",
    delivery: "Available",
    mileage: "0 KM",
    transmission: "8-speed PDK",
    drivetrain: "AWD",
    exteriorColor: "Guards Red",
    interiorColor: "Black/Chalk",
    vin: "WP0AB2A92GSXXXXXX",
    engine: "3.8-liter Twin-Turbo Flat-Six Engine",
    horsepower: "640 HP",
    torque: "590 lb-ft",
    description: "The Porsche 911 Turbo S is the ultimate everyday supercar. Its iconic design is matched by blistering performance, thanks to its powerful flat-six engine and the legendary Porsche all-wheel drive system.",
    features: [
      "640 Horsepower Twin-Turbo Flat-Six Engine",
      "Porsche Traction Management (PTM) AWD",
      "Porsche Ceramic Composite Brakes (PCCB)",
      "Sport Chrono Package with Mode Switch",
      "Porsche Active Suspension Management (PASM)"
    ],
    options: [
      "Lightweight Carbon Roof",
      "Burmester High-End Surround Sound System",
      "Adaptive Sport Seats Plus"
    ],
    seller: {
      name: "Porsche Phnom Penh",
      address: "456 Street 789, Phnom Penh, Cambodia",
      phone: "+855 23 444 5555",
      email: "sales@porschecambodia.com"
    },
    images: [
      porsche_s,
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2"
    ]
  },
  {
    id: "6",
    year: "2025",
    location: "Phnom Penh",
    name: "Mercedes-Benz",
    model: "C63s AMG",
    type: "Sedan",
    price: "110,000",
    originalPrice: "115,000",
    condition: "New",
    delivery: "Available",
    mileage: "0 KM",
    transmission: "9-speed MCT",
    drivetrain: "RWD",
    exteriorColor: "Selenite Grey Metallic",
    interiorColor: "Black Nappa Leather",
    vin: "W1K6G8EB8RAXXXXXX",
    engine: "4.0-liter Twin-Turbo V8 Engine",
    horsepower: "503 HP",
    torque: "516 lb-ft",
    description: "The Mercedes-AMG C63s combines luxury with raw power, featuring a handcrafted AMG V8 engine and race-inspired performance in a refined sedan package.",
    features: [
      "AMG SPEEDSHIFT MCT 9-speed transmission",
      "AMG Performance Exhaust",
      "AMG RIDE CONTROL suspension",
      "AMG DYNAMIC SELECT drive modes"
    ],
    options: [
      "AMG Night Package",
      "AMG Carbon Fiber Trim",
      "Burmester High-End 3D Sound System"
    ],
    seller: {
      name: "Mercedes-Benz Phnom Penh",
      address: "100 Street 200, Phnom Penh, Cambodia",
      phone: "+855 77 111 222",
      email: "sales@mbcambodia.com"
    },
    images: [
      Amg_c63,
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2"
    ]
  },
  {
    id: "7",
    year: "2025",
    location: "Phnom Penh",
    name: "Jeep",
    model: "Grand Cherokee Trackhawk",
    type: "SUV",
    price: "90,000",
    originalPrice: "95,000",
    condition: "New",
    delivery: "Available",
    mileage: "0 KM",
    transmission: "8-speed Automatic",
    drivetrain: "4WD",
    exteriorColor: "Velvet Red",
    interiorColor: "Black Leather",
    vin: "1C4RJFDG5JCXXXXXX",
    engine: "6.2-liter Supercharged HEMI V8 Engine",
    horsepower: "707 HP",
    torque: "645 lb-ft",
    description: "The Jeep Grand Cherokee Trackhawk is the most powerful SUV ever built by Jeep, combining supercar performance with legendary Jeep capability.",
    features: [
      "Quadra-Trac Active On-Demand 4x4 System",
      "Brembo High-Performance Brakes",
      "Launch Control",
      "Adaptive Cruise Control"
    ],
    options: [
      "Trackhawk Appearance Package",
      "Harmon Kardon Audio System",
      "Dual-Pane Panoramic Sunroof"
    ],
    seller: {
      name: "Jeep Cambodia",
      address: "300 Street 400, Phnom Penh, Cambodia",
      phone: "+855 70 123 456",
      email: "info@jeepcambodia.com"
    },
    images: [
      "https://placehold.co/600x400/808080/FFFFFF?text=Jeep+Grand+Cherokee+Trackhawk",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2"
    ]
  },
  {
    id: "8",
    year: "2025",
    location: "Phnom Penh",
    name: "Honda",
    model: "Civic Type R",
    type: "Hatchback",
    price: "45,000",
    originalPrice: "47,000",
    condition: "Used",
    delivery: "Unavailable",
    mileage: "15,000 KM",
    transmission: "6-speed Manual",
    drivetrain: "FWD",
    exteriorColor: "Championship White",
    interiorColor: "Black/Red",
    vin: "SHHFK8G74LUXXXXXX",
    engine: "2.0-liter Turbocharged VTEC Engine",
    horsepower: "315 HP",
    torque: "310 lb-ft",
    description: "The Honda Civic Type R is the ultimate performance version of the Civic, offering track-ready performance in a practical hatchback package.",
    features: [
      "6-Speed Manual Transmission",
      "Adaptive Damper System",
      "3-Mode Drive System",
      "High-Response Steering"
    ],
    options: [
      "Type R Shift Knob",
      "Illuminated Door Sills",
      "Wireless Charger"
    ],
    seller: {
      name: "Honda Phnom Penh",
      address: "500 Street 600, Phnom Penh, Cambodia",
      phone: "+855 11 222 333",
      email: "sales@hondacambodia.com"
    },
    images: [
      "https://placehold.co/600x400/808080/FFFFFF?text=Honda+Civic+Type+R",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+1",
      "https://placehold.co/150x100/1e1e1e/d4d4d4?text=Thumbnail+2"
    ]
  },
];