import React from "react"

const iframeHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.6127262180016!2d44.75324405125155!3d41.728874982615956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044731df4538229%3A0xa58418ac4d8a9a52!2sAlternative%20Georgia!5e0!3m2!1sen!2sge!4v1570537517611!5m2!1sen!2sge" width="500" height="400" frameborder="0" style="border:0;" allowfullscreen=""></iframe>`

export default (props) => {
  return (
    <div
      style={props.style}
      className={props.className}
      dangerouslySetInnerHTML={{ __html: iframeHTML }}
    />
  )
}

