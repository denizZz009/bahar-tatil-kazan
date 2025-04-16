
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

  // Filter available transport options based on passenger count
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
          {/* Welcome Screen */}
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
                  
                  <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-left">
                      <p className="text-gray-600">Toplam Değeri:</p>
                      <p className="text-2xl font-bold text-gray-800">47.000 TL</p>
                    </div>
                    <div className="text-left mt-4 md:mt-0">
                      <p className="text-gray-600">Sizin Ödemeniz Gereken Yalnızca:</p>
                      <p className="text-2xl font-bold text-[#33C3F0]">5.680 TL</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-2">
                  Bu ödeme, tatil hakkınızı onaylamak ve sistemdeki yerinizi garanti altına almak içindir.
                </p>
                <p className="text-gray-600 mb-2">
                  Ücret, tatil öncesinde eksiksiz iade edilir.
                </p>
                <p className="text-gray-600 mb-4">
                  Dilerseniz tatilden vazgeçerek ödemenizi 24 saat içinde koşulsuz şekilde geri alabilirsiniz.
                </p>
                
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

          {!showWelcome && (
            <>
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className={`font-medium ${step >= 1 ? "text-[#33C3F0]" : "text-gray-400"}`}>1. Otel</span>
                  <span className={`font-medium ${step >= 2 ? "text-[#33C3F0]" : "text-gray-400"}`}>2. Tarih</span>
                  <span className={`font-medium ${step >= 3 ? "text-[#33C3F0]" : "text-gray-400"}`}>3. Ulaşım</span>
                  <span className={`font-medium ${step >= 4 ? "text-[#33C3F0]" : "text-gray-400"}`}>4. Yolcu Bilgileri</span>
                  <span className={`font-medium ${step >= 5 ? "text-[#33C3F0]" : "text-gray-400"}`}>5. Ödeme</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-[#33C3F0] h-2 rounded-full transition-all duration-300" style={{ width: `${(step/5) * 100}%` }}></div>
                </div>
              </div>

              {/* Step 1: Hotel Selection */}
              {step === 1 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-[#33C3F0] mb-4">Otel Seçimi</h2>
                  <p className="text-gray-600 mb-6">
                    Kampanyanız kapsamında aşağıdaki 5 yıldızlı otellerden birini seçiniz.
                  </p>

                  <div className="grid md:grid-cols-1 gap-4 mb-6">
                    {hotels.map((hotel) => (
                      <div 
                        key={hotel.id} 
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedHotel?.id === hotel.id ? 'ring-2 ring-[#33C3F0]' : ''}`}
                        onClick={() => handleHotelSelection(hotel)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-64 md:h-auto relative">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-4">
                            <h3 className="text-xl font-semibold">{hotel.name}</h3>
                            <p className="text-gray-600 mb-2">{hotel.location}</p>
                            <div className="flex items-center mb-4">
                              {Array(hotel.rating).fill(0).map((_, index) => (
                                <span key={index} className="text-yellow-400 text-xl">★</span>
                              ))}
                            </div>
                            <p className="text-green-600 font-semibold">Kampanya kapsamında ücretsiz konaklama</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedHotel && (
                    <div>
                      <h3 className="text-xl font-semibold text-[#33C3F0] mb-4">Oda Seçimi</h3>
                      <p className="text-gray-600 mb-4">
                        {selectedHotel.name} için uygun oda tipini seçiniz:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {selectedHotel.roomTypes.map((room) => (
                          <div 
                            key={room.id} 
                            className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-md ${selectedRoom?.id === room.id ? 'ring-2 ring-[#33C3F0]' : ''}`}
                            onClick={() => handleRoomSelection(room)}
                          >
                            <div className="h-48 relative">
                              <img 
                                src={room.image} 
                                alt={room.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold">{room.name}</h4>
                              <div className="flex items-center mt-2">
                                <Users size={16} className="text-gray-500 mr-1" />
                                <span className="text-gray-600 text-sm">Max {room.maxPeople} kişi</span>
                              </div>
                              <div className="mt-2">
                                <div className="flex items-center">
                                  <Bed size={16} className="text-[#33C3F0] mr-1" />
                                  <span className="text-gray-700 text-sm">Her Şey Dahil Konsept</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 bg-blue-50 p-4 rounded-md">
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => selectedRoom && setStep(2)}
                        disabled={!selectedRoom}
                        className="bg-[#33C3F0] hover:bg-[#1EAEDB]"
                      >
                        Devam Et
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Date Selection */}
              {step === 2 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-[#33C3F0] mb-4">Tarih Seçimi</h2>
                  <p className="text-gray-600 mb-6">
                    Lütfen Haziran - Ağustos 2025 tarihleri arasında tatil yapmak istediğiniz tarihleri seçiniz.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Giriş Tarihi</h3>
                      <DatePicker 
                        date={checkInDate} 
                        onSelect={setCheckInDate}
                        fromMonth={new Date(2025, 5)} // June
                        toMonth={new Date(2025, 7)} // August
                        disabled={(date) => {
                          return date < new Date(2025, 5, 1) || date > new Date(2025, 7, 31);
                        }}
                        placeholder="Giriş tarihi seçin"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Çıkış Tarihi</h3>
                      <DatePicker 
                        date={checkOutDate} 
                        onSelect={setCheckOutDate}
                        fromMonth={new Date(2025, 5)} // June
                        toMonth={new Date(2025, 7)} // August
                        disabled={(date) => {
                          return (
                            date < new Date(2025, 5, 1) || 
                            date > new Date(2025, 7, 31) || 
                            (checkInDate && date <= checkInDate)
                          );
                        }}
                        placeholder="Çıkış tarihi seçin"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Seçilen Bilgiler:</p>
                        <p className="text-[#33C3F0] font-medium">
                          {selectedHotel?.name}, {selectedRoom?.name}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setStep(1)}
                          variant="outline"
                          className="border-[#33C3F0] text-[#33C3F0]"
                        >
                          Geri
                        </Button>
                        <Button 
                          onClick={handleDateSelection}
                          disabled={!checkInDate || !checkOutDate}
                          className="bg-[#33C3F0] hover:bg-[#1EAEDB]"
                        >
                          Devam Et
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Transportation */}
              {step === 3 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-[#33C3F0] mb-4">Ulaşım Seçimi</h2>
                  <p className="text-gray-600 mb-4">
                    Kampanyanız gidiş-dönüş ulaşım dahil olarak düzenlenmiştir. Lütfen tercih ettiğiniz ulaşım yöntemini seçin.
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yolcu Sayısı</label>
                    <div className="flex items-center">
                      <Select
                        value={passengerCount.toString()}
                        onValueChange={(value) => setPassengerCount(parseInt(value))}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Kişi sayısı" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: selectedRoom?.maxPeople || 2}).map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} kişi
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="ml-2 text-sm text-gray-600">(Max: {selectedRoom?.maxPeople} kişi)</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div 
                      className={`border rounded-lg p-6 cursor-pointer hover:shadow-md ${transportType === 'flight' ? 'ring-2 ring-[#33C3F0] bg-blue-50' : ''}`}
                      onClick={() => handleTransportTypeSelection('flight')}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <Plane size={48} className="text-[#33C3F0]" />
                      </div>
                      <h3 className="text-lg font-semibold text-center">Uçak</h3>
                      <p className="text-gray-600 text-center text-sm mt-2">Daha hızlı ulaşım için</p>
                    </div>

                    <div 
                      className={`border rounded-lg p-6 cursor-pointer hover:shadow-md ${transportType === 'bus' ? 'ring-2 ring-[#33C3F0] bg-blue-50' : ''}`}
                      onClick={() => handleTransportTypeSelection('bus')}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <Bus size={48} className="text-[#33C3F0]" />
                      </div>
                      <h3 className="text-lg font-semibold text-center">Otobüs</h3>
                      <p className="text-gray-600 text-center text-sm mt-2">Ekonomik ulaşım için</p>
                    </div>
                  </div>

                  {transportType && (
                    <>
                      <h3 className="text-xl font-semibold text-[#33C3F0] mb-4">
                        {transportType === 'flight' ? 'Uçuş' : 'Otobüs'} Seçimi
                      </h3>

                      {availableTransport.length > 0 ? (
                        <div className="mb-4">
                          <p className="text-gray-600 mb-4">
                            {passengerCount} kişi için uygun {transportType === 'flight' ? 'uçuşları' : 'otobüs seferlerini'} inceleyebilirsiniz:
                          </p>

                          <div className="border rounded-lg overflow-hidden mb-6">
                            <div className="bg-gray-100 px-4 py-2 font-semibold grid grid-cols-5">
                              <div>Firma</div>
                              <div>Kalkış</div>
                              <div>Varış</div>
                              <div>{transportType === 'flight' ? 'Uçuş No' : 'Sefer No'}</div>
                              <div>Boş Koltuk</div>
                            </div>
                            <div className="divide-y">
                              {availableTransport.map((item) => (
                                <div 
                                  key={item.id}
                                  className={`px-4 py-3 grid grid-cols-5 hover:bg-blue-50 cursor-pointer ${selectedTransport?.id === item.id ? 'bg-blue-50' : ''}`}
                                  onClick={() => handleTransportSelection(item)}
                                >
                                  <div>{item.company}</div>
                                  <div>{item.departureTime}</div>
                                  <div>{item.arrivalTime}</div>
                                  <div>{transportType === 'flight' ? item.flightNumber : item.busNumber}</div>
                                  <div>{item.maxSeats} koltuk</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md mb-6">
                          <p>Seçtiğiniz yolcu sayısı için uygun {transportType === 'flight' ? 'uçuş' : 'otobüs seferi'} bulunamamıştır. Lütfen daha az sayıda yolcu seçin veya farklı bir ulaşım yöntemi deneyin.</p>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-8 bg-blue-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Seçilen Bilgiler:</p>
                        <p className="text-[#33C3F0] font-medium">
                          {selectedHotel?.name}, {formatDate(checkInDate)} - {formatDate(checkOutDate)}, {passengerCount} kişi
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setStep(2)}
                          variant="outline"
                          className="border-[#33C3F0] text-[#33C3F0]"
                        >
                          Geri
                        </Button>
                        <Button 
                          onClick={() => selectedTransport && setStep(4)}
                          disabled={!selectedTransport}
                          className="bg-[#33C3F0] hover:bg-[#1EAEDB]"
                        >
                          Devam Et
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Passenger Information */}
              {step === 4 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-[#33C3F0] mb-4">Yolcu Bilgileri</h2>
                  <p className="text-gray-600 mb-6">
                    Rezervasyonunuzu tamamlamak için lütfen yolcu bilgilerini giriniz.
                  </p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePassengerSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Soyad</FormLabel>
                            <FormControl>
                              <Input placeholder="Ad Soyad" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="identityNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>T.C. Kimlik No</FormLabel>
                            <FormControl>
                              <Input placeholder="11 haneli T.C. Kimlik No" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Doğum Tarihi</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="05XX XXX XX XX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-posta</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="ornek@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="mt-8 bg-blue-50 p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-600">Seçilen Bilgiler:</p>
                            <p className="text-[#33C3F0] font-medium">
                              {formatDate(checkInDate)} - {formatDate(checkOutDate)}, {selectedHotel?.name}, {passengerCount} kişi
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              type="button"
                              onClick={() => setStep(3)}
                              variant="outline"
                              className="border-[#33C3F0] text-[#33C3F0]"
                            >
                              Geri
                            </Button>
                            <Button 
                              type="submit"
                              className="bg-[#33C3F0] hover:bg-[#1EAEDB]"
                            >
                              Devam Et
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              )}

              {/* Step 5: Payment */}
              {step === 5 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-[#33C3F0] mb-4">Ödeme Bilgileri</h2>
                  
                  <div className="border-b pb-4 mb-6">
                    <h3 className="text-lg font-medium mb-4">Tatil Paketi Detayları</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>5 yıldızlı otelde 5 gece 6 gün konaklama</li>
                      <li>Her şey dahil yeme-içme konsepti</li>
                      <li>Gidiş-dönüş {transportType === 'flight' ? 'uçak bileti' : 'otobüs bileti'} ve otel transferleri</li>
                      <li>SPA, havuz, özel plaj ve rehberlik hizmetleri</li>
                      <li>Açık büfe kahvaltı, öğle ve akşam yemekleri</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-md mb-6">
                    <h3 className="text-lg font-medium text-green-800 mb-2">Tebrikler!</h3>
                    <p className="text-green-700">
                      <span className="font-semibold">Ali Kara</span>, TatilBudur.com iş birliğiyle düzenlenen 2025 Bahar Tatil Kampanyası çekilişi sonucunda 5 Gece 6 Gün Ulaşım Dahil – Her Şey Dahil Tatil Paketi kazandınız.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Paket Değeri:</span>
                      <span className="font-medium">47.000 TL</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Ödeyeceğiniz Tutar:</span>
                      <span className="text-[#33C3F0]">5.680 TL</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Bu ödeme, tatil hakkınızı onaylamak ve sistemdeki yerinizi garanti altına almak içindir.
                      Ücret, tatil öncesinde eksiksiz iade edilir.
                    </p>
                  </div>

                  <div className="border p-4 rounded-md mb-6">
                    <h3 className="text-lg font-medium mb-4">Ödeme Bilgileri</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-gray-600">Banka Adı:</span>
                        <span className="col-span-2 font-medium">Örnek Banka A.Ş.</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-gray-600">Hesap Sahibi:</span>
                        <span className="col-span-2 font-medium">Firma Ünvanı</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-gray-600">IBAN:</span>
                        <span className="col-span-2 font-medium">TR00 0000 0000 0000 0000 0000 00</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-gray-600">Tutar:</span>
                        <span className="col-span-2 font-medium">5.680 TL</span>
                      </div>
                    </div>
                  </div>

                  <div className="border p-4 rounded-md mb-6">
                    <h3 className="text-lg font-medium mb-4">Dekont Yükleme</h3>
                    <p className="text-gray-600 mb-4">
                      Lütfen ödemenizi gerçekleştirdikten sonra dekontu aşağıdaki alana yükleyiniz.
                    </p>
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50">
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                        <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          {uploadedFile ? uploadedFile.name : "Dekont dosyasını buraya sürükleyin veya seçin"}
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
                    <div className="flex items-start">
                      <Info className="text-yellow-600 mt-1 mr-2 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-medium text-yellow-800">Önemli Bilgilendirme</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Bu işlem yalnızca sistem onayı ve tatil kazanımınızı teyit amacıyla yapılmaktadır. 
                          Ödeme, tatil öncesinde tarafınıza eksiksiz iade edilecektir. 
                          Dilerseniz tatilden vazgeçerek ödemenizi 24 saat içinde koşulsuz şekilde geri alabilirsiniz.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button 
                      onClick={() => setStep(4)}
                      variant="outline"
                      className="border-[#33C3F0] text-[#33C3F0]"
                    >
                      Geri
                    </Button>
                    <Button 
                      onClick={() => setShowPaymentDialog(true)}
                      className="bg-[#33C3F0] hover:bg-[#1EAEDB]"
                      disabled={!uploadedFile}
                    >
                      Ödemeyi Onayla
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ödeme Onayı</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-4">
              Ödemeniz kontrol ediliyor. Onay sonrası, aynı gün içinde ödemeniz gönderim yaptığınız banka hesabına iade edilecektir.
            </p>
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-green-700 font-medium">
                Rezervasyonunuz başarıyla oluşturuldu! 
              </p>
              <p className="text-green-600 text-sm mt-2">
                Ödeme dekontunuz sistemimize kaydedildi. 
                24 saat içinde 5.680 TL ödemeniz tarafınıza iade edilecektir.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handlePaymentConfirmation} className="bg-[#33C3F0] hover:bg-[#1EAEDB]">
              Tamam
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
