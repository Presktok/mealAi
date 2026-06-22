import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import { Button, Input, Modal, Toast, Loader } from '../components/ui'

function ComponentsDemo() {
  const [inputValue, setInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (type) => {
    setToastMessage('')
    setTimeout(() => {
      setToastMessage(`This is a ${type} toast message!`)
    }, 50)
    setTimeout(() => setToastMessage(''), 3000)
  }

  return (
    <PageLayout variant="content">
      <h1 className="mb-2 text-3xl font-bold">UI Component Library</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Reusable components for MoodMeal AI — buttons, inputs, modals, toasts,
        and loaders.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button text="Primary" onClick={() => {}} variant="primary" />
          <Button text="Secondary" onClick={() => {}} variant="secondary" />
          <Button text="Outline" onClick={() => {}} variant="outline" />
          <Button text="Danger" onClick={() => {}} variant="danger" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Input</h2>
        <Input
          placeholder="Search for a meal..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Modal</h2>
        <Button text="Open Modal" onClick={() => setModalOpen(true)} />
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h3 className="mb-2 text-lg font-semibold">Sample Modal</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            This modal can hold confirmations, forms, or any overlay content.
          </p>
          <Button text="Close" onClick={() => setModalOpen(false)} />
        </Modal>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Toast</h2>
        <div className="flex flex-wrap gap-3">
          <Button text="Success" onClick={() => showToast('success')} variant="primary" />
          <Button text="Error" onClick={() => showToast('error')} variant="danger" />
          <Button text="Info" onClick={() => showToast('info')} variant="secondary" />
        </div>
        <Toast message={toastMessage} type={toastMessage.includes('success') ? 'success' : toastMessage.includes('error') ? 'error' : 'info'} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Loader</h2>
        <div className="flex items-center gap-6">
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>
      </section>
    </PageLayout>
  )
}

export default ComponentsDemo
