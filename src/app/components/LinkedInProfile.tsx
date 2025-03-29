'use client'

import { useLinkedIn } from '@/hooks/useLinkedIn'
import { textColor, bgColor } from "@/app/styles/theme"

export function LinkedInProfile() {
  const { profile, isLoading, error } = useLinkedIn()

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-red-500 dark:text-red-400`}>
        Failed to load LinkedIn profile
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {profile.profilePicture && (
          <img
            src={profile.profilePicture}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <h2 className={`text-2xl font-bold ${textColor.primary}`}>
            {profile.firstName} {profile.lastName}
          </h2>
          <p className={`${textColor.secondary}`}>{profile.headline}</p>
        </div>
      </div>

      {profile.summary && (
        <p className={`${textColor.secondary}`}>{profile.summary}</p>
      )}

      {profile.currentPosition && (
        <div>
          <h3 className={`text-lg font-semibold ${textColor.primary} mb-2`}>
            Current Position
          </h3>
          <p className={`${textColor.secondary}`}>
            {profile.currentPosition.title} at {profile.currentPosition.company}
          </p>
        </div>
      )}

      {profile.skills && profile.skills.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold ${textColor.primary} mb-2`}>
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 text-sm rounded-full ${bgColor.accentLight} ${textColor.accent}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.certifications && profile.certifications.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold ${textColor.primary} mb-2`}>
            Certifications
          </h3>
          <div className="space-y-2">
            {profile.certifications.map((cert) => (
              <div key={cert.name} className={textColor.secondary}>
                <p className="font-medium">{cert.name}</p>
                <p className="text-sm">{cert.organization}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 