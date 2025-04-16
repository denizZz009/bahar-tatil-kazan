
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import { format } from "date-fns";

const Index = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [step, setStep] = useState(1);

  const handleDateSelection = () => {
    if (checkInDate && checkOutDate) {
      setStep(2);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Tarih seçiniz";
    return format(date, "dd MMMM yyyy");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Tatil Fırsatı</h1>
          <p className="text-sm">5 Gece 6 Gün Her Şey Dahil Tatil Paketi</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Tarih Seçimi</h2>
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
                  <p className="text-gray-600">Seçilen Tarihler:</p>
                  <p className="text-blue-700 font-medium">
                    {formatDate(checkInDate)} - {formatDate(checkOutDate)}
                  </p>
                </div>
                <Button 
                  onClick={handleDateSelection}
                  disabled={!checkInDate || !checkOutDate}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Devam Et
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-center text-green-600 font-semibold">
              <p>Tebrikler Ali Kara! Kampanya kapsamında 5 Gece 6 Gün Her Şey Dahil Tatil kazandınız.</p>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Tarih Seçiminiz</h2>
            <div className="bg-green-50 p-4 rounded-md mb-6">
              <p className="text-gray-700">Seçilen Tarihler:</p>
              <p className="text-blue-700 font-bold text-lg">
                {formatDate(checkInDate)} - {formatDate(checkOutDate)}
              </p>
            </div>
            
            <p className="text-gray-600 mb-4">
              Tarih seçiminiz başarıyla kaydedildi. Şimdi otel seçimi yapabilirsiniz.
            </p>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
                className="mr-2"
              >
                Tarihi Değiştir
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
              >
                Otel Seçimine Geç
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
