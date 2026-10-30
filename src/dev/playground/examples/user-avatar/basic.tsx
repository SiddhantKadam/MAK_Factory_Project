import { UserAvatar } from "@/components/data-display/user-avatar"

export default function UserAvatarExample() {
  return (
    <div className="flex items-center gap-4">
      <UserAvatar name="M. Delgado" size="sm" />
      <UserAvatar name="M. Delgado" />
      <UserAvatar name="Priya Sharma" size="lg" />
      <UserAvatar name="A. Rahman" className="bg-primary" />
    </div>
  )
}
