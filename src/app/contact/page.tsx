import type { Metadata } from 'next'
import { ContactPage } from '@/components/sections/ContactPage'

export const metadata: Metadata = {
  title:       'Contact | Luli Properties',
  description: 'Register your interest in UK residential property investment with Luli Properties.',
}

export default function Contact() {
  return <ContactPage />
}
