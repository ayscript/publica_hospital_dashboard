import React from 'react'

// Use React.ReactNode for children
const SubHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-b border-[#CFCFCF] py-6 px-[5%] flex items-center justify-between">
        {children}
      </div>
  )
}

export default SubHeader