
import { useState, useEffect, useRef } from "react";
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
import { instance } from "@/constants";

type Rows = {
  name: string
}

type Data = {
  data: {
    count: number
    rows: Rows[]
  }
}

type Times = {
  booked: null | number
  date: string
  id: number
  limits: number
  period: 'morning' | 'evening' | 'afternoon'
  time: string
}

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
  service: z.string().min(1, "Please select a service type"), 
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  notes: z.string().optional(),
});


const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      notes: "",
    },
  });

  const disabledDays = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date <= yesterday) return true;

    return unavailableDates.some(unavailableDate =>
      date.getDate() === unavailableDate.getDate() &&
      date.getMonth() === unavailableDate.getMonth() &&
      date.getFullYear() === unavailableDate.getFullYear()
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      if (uploadedPhotos.length + newFiles.length > 5) {
        toast({
          title: "Too many photos",
          description: "You can upload a maximum of 5 photos.",
          variant: "destructive",
        });
        return;
      }

      setUploadedPhotos(prev => [...prev, ...newFiles]);

      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setPhotoUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoUrls[index]);

    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoUrls(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  useEffect(() => {
    return () => {
      photoUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photoUrls]);


  const [dataSelect, setDataSelect] = useState([])
  const [dateState, setDateState] = useState('')
  const [period, setPeriod] = useState([])
  const serviceType = async () => {
    try {
      const response: Data = await instance.get('/service-type')
      const array = response.data.rows.map(item => item.name)
      setDataSelect(array)
      return response.data.rows
    }
    catch (error) {
      console.log(error);
    }
  }

  const [morning, setMorning] = useState<Times[]>([]);
  const [afternoon, setAfternoon] = useState<Times[]>([]);
  const [evening, setEvening] = useState<Times[]>([]);


  const selectDateTime = async () => {
    try {
      const response: { data: Times[] } = await instance.get(`/select-date-time?date=${dateState}`)
      setPeriod(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    serviceType()
  }, [])



  useEffect(() => {

    if (dateState) {
      selectDateTime()
    }
  }, [dateState])

  useEffect(() => {
    if (period.length > 0) {
      setMorning(period.filter(p => p.period === "morning"));
      setAfternoon(period.filter(p => p.period === "afternoon"));
      setEvening(period.filter(p => p.period === "evening"));
    } else {
      setMorning([]);
      setAfternoon([]);
      setEvening([]);
    }
  }, [period]);


  const convertDateFormat = (date: Date) => {
    const fullDate = new Date(date)
    const dd = `${fullDate.getDate()}`.padStart(2, "0")
    const mm = `${(fullDate.getMonth() + 1)}`.padStart(2, "0")
    const yyyy = fullDate.getFullYear()

    setDateState(`${dd}.${mm}.${yyyy}`)
    setSelectedDate(date)
  }

  const timeSlots = {
    morning,
    afternoon,
    evening
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete booking",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    if (uploadedPhotos.length === 0) {
      toast({
        title: "Photo required",
        description: "Please upload at least one photo.",
        variant: "destructive",
      });
      return;
    }


    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("full_name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("street", data.streetAddress);
    formData.append("state", data.state);
    formData.append("zip", data.zipCode);
    formData.append("descriptions", data.notes || "");
    formData.append("service_type", data.service);
    formData.append("date", dateState);
    formData.append("time", selectedTime);

    uploadedPhotos.forEach((photo, index) => {
      formData.append("uploaded", photo);
    });

    try {
      const res = await instance.post("/consultation", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Booking confirmed!",
        description: res.data.message,
      });

      // Reset form
      form.reset();
      setSelectedDate(undefined);
      setSelectedTime(null);
      setUploadedPhotos([]);
      setPhotoUrls([]);
    } catch (error: any) {
      toast({
        title: "Submission error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

  };



  return (
    <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-gray-50 p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-6">Select a Date & Time</h3>

          <div className="mb-8">
            <Calendar
              mode="single"
              onDayClick={(date) => {
                convertDateFormat(date)
              }}
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

                          style={{ background: time.booked >= time.limits ? "gray" : '', color: time.booked >= time.limits ? "white" : '' }}
                          disabled={time.booked >= time.limits}
                          key={time.id}
                          type="button"
                          onClick={() => setSelectedTime(time.time)}
                          className={cn(
                            "py-2 px-2 text-sm rounded-md border border-gray-200 transition-all",
                            selectedTime === time.time
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-700 hover:border-gray-300"
                          )}
                        >
                          <span className="flex items-center justify-center">
                            <Clock className={cn("mr-1 h-3 w-3", selectedTime === time.time ? "text-white" : "text-gray-400")} />
                            {time.time}
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
                        <option value="">-- Select a service --</option> {/* 👈 value пустая строка */}
                        {dataSelect.map((name, index) => (
                          <option key={index + name} value={name}>
                            {name}
                          </option>
                        ))}
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
                    ref={fileInputRef}
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
