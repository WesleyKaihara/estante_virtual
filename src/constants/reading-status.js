const readingStatus = {
  1: {
    title: "COMPLETED",
    fields: [
      "user",
      "title",
      "status",
      "startDateReading",
      "endDateReading",
    ]
  },
  2: {
    title: "IN_PROGRESS",
    fields: [
      "user",
      "title",
      "status",
      "startDateReading",
    ]
  },
  3: {
    title: "INTEREST",
    fields: [
      "user",
      "title",
      "status"
    ]
  }
}

module.exports = readingStatus
