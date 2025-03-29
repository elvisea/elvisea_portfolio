export interface LinkedInProfile {
  id: string
  firstName: string
  lastName: string
  headline: string
  profilePicture?: string
  email?: string
  summary?: string
  currentPosition?: {
    title: string
    company: string
    startDate: string
  }
  skills?: string[]
  certifications?: Array<{
    name: string
    organization: string
    issueDate: string
    expirationDate?: string
    credentialUrl?: string
  }>
  education?: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate?: string
  }>
} 