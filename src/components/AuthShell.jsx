export function AuthShell({ image, caption, children }) {
  return (
    <div className="grid lg:min-h-[calc(100vh-7.5rem)] lg:grid-cols-2">
      <div className="relative hidden min-h-[28rem] lg:block">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-ink/10" />
        <p className="absolute bottom-10 left-10 right-10 font-serif text-5xl leading-[1.05] text-white">{caption}</p>
      </div>
      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
