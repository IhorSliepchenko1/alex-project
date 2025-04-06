
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Check, Upload, MapPin, Camera, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Mock available time slots data
const timeSlots = {
  morning: ["9:00 AM", "10:00 AM", "11:00 AM"],
  afternoon: ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  evening: ["5:00 PM", "6:00 PM"]
};

// Mock unavailable dates
const unavailableDates = [
  new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  new Date(new Date().getFullYear(), new Date().getMonth(), 16),
  new Date(new Date().getFullYear(), new Date().getMonth(), 20),
  new Date(new Date().getFullYear(), new Date().getMonth(), 25),
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  service: z.string({
    required_error: "Please select a service type",
  }),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  notes: z.string().optional(),
});

const BookingCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "bathroom-remodel",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      notes: "",
    },
  });

  // Disable dates in the past and unavailable dates
  const disabledDays = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if date is in the past
    if (date <= yesterday) return true;
    
    // Check if date is in unavailable dates
    return unavailableDates.some(unavailableDate => 
      date.getDate() === unavailableDate.getDate() && 
      date.getMonth() === unavailableDate.getMonth() && 
      date.getFullYear() === unavailableDate.getFullYear()
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Limit to 5 photos
      if (uploadedPhotos.length + newFiles.length > 5) {
        toast({
          title: "Too many photos",
          description: "You can upload a maximum of 5 photos.",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedPhotos(prev => [...prev, ...newFiles]);
      
      // Create URL previews
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setPhotoUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removePhoto = (index: number) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(photoUrls[index]);
    
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoUrls(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete booking",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form data:", data);
      console.log("Date:", selectedDate);
      console.log("Time:", selectedTime);
      console.log("Photos:", uploadedPhotos);
      
      setIsSubmitting(false);
      toast({
        title: "Booking confirmed!",
        description: `Your appointment has been scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
      });
      
      // Reset form
      form.reset();
      setSelectedDate(undefined);
      setSelectedTime(null);
      setUploadedPhotos([]);
      setPhotoUrls([]);
    }, 1500);
  };

  useEffect(() => {
    // Reset selected time when date changes
    setSelectedTime(null);
  }, [selectedDate]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      photoUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photoUrls]);

  return (
    <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-gray-50 p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-6">Select a Date & Time</h3>
          
          <div className="mb-8">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className={cn("p-3 pointer-events-auto rounded-lg border")}
              classNames={{
                day_selected: "bg-gray-900 text-white hover:bg-gray-800 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "bg-gray-100 text-gray-900",
              }}
            />
          </div>
          
          {selectedDate && (
            <div className="animate-fade-in">
              <h4 className="text-sm font-medium flex items-center mb-3">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Available Times for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>
              
              <div className="space-y-4">
                {Object.entries(timeSlots).map(([period, times]) => (
                  <div key={period}>
                    <h5 className="text-xs uppercase text-gray-500 mb-2">
                      {period}
                    </h5>
                    <div className="grid grid-cols-3 gap-2">
                      {times.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 px-2 text-sm rounded-md border border-gray-200 transition-all",
                            selectedTime === time
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-700 hover:border-gray-300"
                          )}
                        >
                          <span className="flex items-center justify-center">
                            <Clock className={cn("mr-1 h-3 w-3", selectedTime === time ? "text-white" : "text-gray-400")} />
                            {time}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-6">Your Booking Details</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
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
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your phone number (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
                        {...field}
                      >
                        <option value="bathroom-remodel">Bathroom Remodel</option>
                        <option value="handyman">Handyman Services</option>
                        <option value="consultation">Design Consultation</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 pb-2">
                <h4 className="text-base font-medium flex items-center mb-3">
                  <MapPin className="mr-2 h-4 w-4" />
                  Service Address
                </h4>
              </div>
              
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="pt-4 pb-2">
                <h4 className="text-base font-medium flex items-center mb-3">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photos
                </h4>
                <p className="text-sm text-gray-500">
                  Add up to 5 photos of the area you need help with
                </p>
              </div>
              
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                <label className="block w-full cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handlePhotoUpload}
                    className="hidden" 
                  />
                  <div className="flex flex-col items-center justify-center py-3">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Click to upload photos</p>
                    <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                  </div>
                </label>
              </div>
              
              {photoUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {photoUrls.map((url, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-24">
                      <img 
                        src={url} 
                        alt={`Uploaded photo ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe the issue or project in detail" 
                        rows={3} 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-lg flex items-center justify-center" 
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Book Now - No Phone Call Required
                      <Check className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
                
                {(!selectedDate || !selectedTime) && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Please select a date and time to continue
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
