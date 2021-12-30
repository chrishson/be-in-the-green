export const FormatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      }).format(new Date(date))
}