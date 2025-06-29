import React from "react";
import { Button } from "../../../../components/ui/button";
import { Form } from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { Card, CardContent } from "../../../../components/ui/card";
import { Send, Star } from "lucide-react";

export const FeedbackFormSection = (): JSX.Element => {
  const formFields = [
    {
      id: "firstName",
      label: "First name",
      placeholder: "Jane",
      type: "input",
      width: "w-full md:w-[calc(50%-12px)]",
    },
    {
      id: "lastName",
      label: "Last name",
      placeholder: "Smitherton",
      type: "input",
      width: "w-full md:w-[calc(50%-12px)]",
    },
    {
      id: "email",
      label: "Email address",
      placeholder: "email@example.com",
      type: "input",
      width: "w-full",
    },
    {
      id: "message",
      label: "Your feedback",
      placeholder: "Tell us about your experience with Sign To Speak...",
      type: "textarea",
      width: "w-full",
    },
  ];

  return (
    <Card className="bg-white shadow-xl border-0 overflow-hidden">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="font-body-text text-gray-600">
            Help us improve Sign To Speak with your valuable feedback
          </p>
        </div>

        <Form>
          <div className="flex flex-wrap gap-6">
            {formFields.map((field) => (
              <div
                key={field.id}
                className={`${field.width} flex flex-col gap-3`}
              >
                <Label 
                  htmlFor={field.id} 
                  className="font-small-text font-medium text-gray-700"
                >
                  {field.label}
                </Label>

                {field.type === "input" ? (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    className="px-4 py-3 bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body-text transition-all duration-200"
                  />
                ) : (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    className="px-4 py-3 bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body-text min-h-[120px] resize-none transition-all duration-200"
                  />
                )}
              </div>
            ))}

            <div className="w-full flex justify-center mt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Feedback
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};