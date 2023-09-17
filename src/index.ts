type Handle = () => Promise<string>

const fullName = 'Thuan Nguyen'

const handle: Handle = () => Promise.resolve(fullName)

handle().then(console.log)
