"use client";

import * as React from 'react';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from '../../../ui/field';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Textarea } from '../../../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';
import { Checkbox } from '../../../ui/checkbox';
import { BriefcaseIcon, FileTextIcon, User2Icon } from 'lucide-react';

export default function ApplicationForm() {
  const positions = [
    { id: '1', title: 'Senior Frontend Developer', department: 'Engineering' },
    { id: '2', title: 'Product Designer', department: 'Design' },
    { id: '3', title: 'DevOps Engineer', department: 'Engineering' },
    { id: '4', title: 'Content Marketing Manager', department: 'Marketing' },
    { id: '5', title: 'Data Scientist', department: 'Data' },
    {
      id: '6',
      title: 'Customer Success Manager',
      department: 'Customer Success',
    },
  ];

  const departments = [
    'Engineering',
    'Design',
    'Product',
    'Marketing',
    'Data',
    'Customer Success',
    'Operations',
    'Sales',
  ];

  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Remote',
    'Chicago, IL',
    'Austin, TX',
  ];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          Join Our Team
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We&apos;re excited about your interest in joining us. Please fill out
          the application form below to get started.
        </p>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Job Application</CardTitle>
          <CardDescription>
            All fields marked with an asterisk (*) are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmit}
            className="space-y-8"
            encType="multipart/form-data"
          >
            <Accordion type="single" collapsible defaultValue="personal">
              <AccordionItem value="personal">
                <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                  <User2Icon className="h-5 w-5" />
                  Personal Information
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-4">
                  <FieldGroup className="grid gap-6 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
                      <Input id="firstName" placeholder="John" />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="lastName">Last Name *</FieldLabel>
                      <Input id="lastName" placeholder="Doe" />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">Email *</FieldLabel>
                      <Input
                        id="email"
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone">Phone Number *</FieldLabel>
                      <Input
                        id="phone"
                        placeholder="(123) 456-7890"
                        type="tel"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="linkedIn">LinkedIn Profile</FieldLabel>
                      <Input
                        id="linkedIn"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                      <FieldDescription>
                        Optional but recommended
                      </FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="portfolio">Portfolio/Website</FieldLabel>
                      <Input
                        id="portfolio"
                        placeholder="https://yourportfolio.com"
                      />
                      <FieldDescription>
                        Optional but recommended for design/development
                        roles
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="position">
                <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                  <BriefcaseIcon className="h-5 w-5" />
                  Position Details
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-4">
                  <FieldGroup className="grid gap-6 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="position">Position *</FieldLabel>
                      <Select>
                        <SelectTrigger id="position">
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                        <SelectContent>
                          {positions.map((position) => (
                            <SelectItem
                              key={position.id}
                              value={position.title}
                            >
                              {position.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="department">Department *</FieldLabel>
                      <Select>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem
                              key={department}
                              value={department}
                            >
                              {department}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="location">Location Preference *</FieldLabel>
                      <Select>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="startDate">Earliest Start Date</FieldLabel>
                      <Input id="startDate" type="date" />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field orientation="horizontal" className="rounded-md border p-4">
                        <Checkbox id="relocation" />
                        <FieldContent>
                          <FieldLabel htmlFor="relocation">
                            I am willing to relocate if required
                          </FieldLabel>
                          <FieldDescription>
                            Some positions may require relocation to one
                            of our office locations.
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    </div>
                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="documents">
                <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                  <FileTextIcon className="h-5 w-5" />
                  Resume &amp; Documents
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-4">
                  <FieldGroup className="space-y-6">
                    <Field>
                      <FieldLabel htmlFor="resume">Resume / CV *</FieldLabel>
                      <div className="relative">
                        <Input
                          id="resume"
                          type="file"
                          className="cursor-pointer"
                          accept=".pdf,.doc,.docx"
                        />
                      </div>
                      <FieldDescription>
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="coverLetter">Cover Letter</FieldLabel>
                      <Textarea
                        id="coverLetter"
                        placeholder="Tell us why you're interested in this position and what you would bring to the role..."
                        className="h-32 resize-none"
                      />
                      <FieldDescription>
                        Optional but recommended
                      </FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="referral">Referral</FieldLabel>
                      <Input
                        id="referral"
                        placeholder="How did you hear about this position?"
                      />
                      <FieldDescription>
                        If you were referred by a current employee, please
                        include their name
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Field orientation="horizontal" className="rounded-md border p-4">
              <Checkbox id="legal" />
              <FieldContent>
                <FieldLabel htmlFor="legal">
                  I certify that all information provided is accurate *
                </FieldLabel>
                <FieldDescription>
                  By checking this box, you agree to our{' '}
                  <a href="#" className="text-primary underline">
                    terms of service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary underline">
                    privacy policy
                  </a>
                  .
                </FieldDescription>
              </FieldContent>
            </Field>

            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
