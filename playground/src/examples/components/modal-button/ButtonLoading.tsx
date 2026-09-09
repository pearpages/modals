import { useState } from 'react'
import { Modal } from '@pearpages/modals'

export default function ButtonLoading() {
  const [saving, setSaving] = useState(false)

  const save = () => {
    setSaving(true)
    window.setTimeout(() => setSaving(false), 1600)
  }

  return (
    <>
      {/* loading shows a spinner and disables the button, so you do not have to
          pass disabled as well. */}
      <Modal.Button variant="primary" loading={saving} onClick={save}>
        {saving ? 'Saving…' : 'Save'}
      </Modal.Button>

      <Modal.Button disabled>Disabled</Modal.Button>
    </>
  )
}
