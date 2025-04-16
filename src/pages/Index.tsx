import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bed, Bus, FileUp, Info, Plane, Upload, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const hotels = [
  {
    id: 1,
    name: "Mavi Deniz Resort & Spa",
    location: "Antalya - Belek",
    rating: 5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    roomTypes: [
      { id: 1, name: "Standart Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 2, name: "Deniz Manzaralı Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 3, name: "Aile Odası", maxPeople: 4, image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 4, name: "Suite", maxPeople: 3, image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  },
  {
    id: 2,
    name: "Palmiye Beach Resort",
    location: "Antalya - Kemer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    roomTypes: [
      { id: 1, name: "Standart Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 2, name: "Deniz Manzaralı Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 3, name: "Aile Odası", maxPeople: 5, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  },
  {
    id: 3,
    name: "Crystal Deluxe Hotel",
    location: "Antalya - Side",
    rating: 5,
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    roomTypes: [
      { id: 1, name: "Standart Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 2, name: "Deluxe Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 3, name: "Suite", maxPeople: 3, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  },
  {
    id: 4,
    name: "Royal Paradise Resort",
    location: "Antalya - Lara",
    rating: 5,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    roomTypes: [
      { id: 1, name: "Standart Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 2, name: "Deniz Manzaralı Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 3, name: "Aile Süiti", maxPeople: 5, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  },
  {
    id: 5,
    name: "Azure Bay Hotel",
    location: "Antalya - Alanya",
    rating: 5,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    roomTypes: [
      { id: 1, name: "Standart Oda", maxPeople: 2, image: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 2, name: "Deluxe Oda", maxPeople: 3, image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 3, name: "Jakuzili Süit", maxPeople: 2, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  }
];

const flights = [
  { id: 1, company: "Türk Hava Yolları", departureTime: "07:30", arrivalTime: "09:15", flightNumber: "TK2154", maxSeats: 30 },
  { id: 2, company: "Pegasus", departureTime: "10:45", arrivalTime: "12:30", flightNumber: "PC1204", maxSeats: 25 },
  { id: 3, company: "SunExpress", departureTime: "14:20", arrivalTime: "16:05", flightNumber: "XQ1182", maxSeats: 28 },
  { id: 4, company: "AnadoluJet", departureTime: "18:50", arrivalTime: "20:35", flightNumber: "TK7760", maxSeats: 20 }
];

const buses = [
  { id: 1, company: "Metro Turizm", departureTime: "08:00", arrivalTime: "18:30", busNumber: "MT343", maxSeats: 45 },
  { id: 2, company: "Kamil Koç", departureTime: "10:30", arrivalTime: "21:00", busNumber: "KK567", maxSeats: 48 },
  { id: 3, company: "Pamukkale Turizm", departureTime: "13:00", arrivalTime: "23:30", busNumber: "PT765", maxSeats: 42 },
  { id: 4, company: "Nilüfer Turizm", departureTime: "16:15", arrivalTime: "02:45", busNumber: "NT233", maxSeats: 44 },
  { id: 5, company: "Varan Turizm", departureTime: "20:00", arrivalTime: "06:30", busNumber: "VR112", maxSeats: 46 },
  { id: 6, company: "Has Turizm", departureTime: "22:30", arrivalTime: "09:00", busNumber: "HT478", maxSeats: 40 }
];

const passengerFormSchema = z.object({
  fullName: z.string().min(5, "Ad ve soyad en az 5 karakter olmalıdır"),
  identityNumber: z.string().min(11, "Kimlik numarası 11 karakter olmalıdır").max(11),
  birthDate: z.string().min(1, "Doğum tarihi gereklidir"),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
});

type PassengerFormValues = z.infer<typeof passengerFormSchema>;

const Index = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<typeof hotels[0]["roomTypes"][0] | null>(null);
  const [passengerCount, setPassengerCount] = useState(2);
  const [transportType, setTransportType] = useState<"flight" | "bus" | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<any | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const form = useForm<PassengerFormValues>({
    resolver: zodResolver(passengerFormSchema),
    defaultValues: {
      fullName: "",
      identityNumber: "",
      birthDate: "",
      phone: "",
      email: "",
    },
  });

  const handleDateSelection = () => {
    if (checkInDate && checkOutDate) {
      setStep(3);
    }
  };

  const handleHotelSelection = (hotel: typeof hotels[0]) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
  };

  const handleRoomSelection = (room: typeof hotels[0]["roomTypes"][0]) => {
    setSelectedRoom(room);
    setStep(2);
  };

  const handleTransportTypeSelection = (type: "flight" | "bus") => {
    setTransportType(type);
    setSelectedTransport(null);
  };

  const handleTransportSelection = (transport: any) => {
    setSelectedTransport(transport);
    setStep(4);
  };

  const handlePassengerSubmit = (data: PassengerFormValues) => {
    console.log("Passenger form data:", data);
    setStep(5);
  };

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true);
    setShowPaymentDialog(false);
  };

  const handleStartProcess = () => {
    setShowWelcome(false);
    setStep(1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Tarih seçiniz";
    return format(date, "dd MMMM yyyy");
  };

  const getAvailableTransport = () => {
    if (transportType === 'flight') {
      return flights.filter(flight => flight.maxSeats >= passengerCount);
    } else if (transportType === 'bus') {
      return buses.filter(bus => bus.maxSeats >= passengerCount);
    }
    return [];
  };

  const availableTransport = getAvailableTransport();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-[#33C3F0] text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <div className="mr-3">
            <img 
              src="https://seeklogo.com/images/T/tatilbudur-com-logo-FDCBC0EA67-seeklogo.com.png" 
              alt="TatilBudur Logo" 
              className="h-10"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tatil Fırsatı</h1>
            <p className="text-sm">5 Gece 6 Gün Her Şey Dahil Tatil Paketi</p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {showWelcome && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-8 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-[#33C3F0] mb-6">Tebrikler Ali Kara!</h2>
                <p className="text-xl mb-4">
                  TatilBudur.com iş birliğiyle düzenlenen 2025 Bahar Tatil Kampanyası çekilişi sonucunda 
                  5 Gece 6 Gün Ulaşım Dahil – Her Şey Dahil Tatil Paketi kazandınız.
                </p>
                
                <div className="border-t border-b border-gray-200 py-6 my-6">
                  <h3 className="text-xl font-semibold mb-4">Tatil Paketi Detayları:</h3>
                  <ul className="text-left list-disc pl-8 space-y-2">
                    <li>5 yıldızlı otelde 5 gece 6 gün konaklama</li>
                    <li>Her şey dahil yeme-içme konsepti</li>
                    <li>Gidiş-dönüş uçak bileti ve otel transferleri</li>
                    <li>SPA, havuz, özel plaj ve rehberlik hizmetleri</li>
                    <li>Açık büfe kahvaltı, öğle ve akşam yemekleri</li>
                  </ul>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={handleStartProcess} 
                    className="bg-[#33C3F0] hover:bg-[#1EAEDB] text-xl px-8 py-6"
                  >
                    Tatilinizi Planlamaya Başlayın
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
