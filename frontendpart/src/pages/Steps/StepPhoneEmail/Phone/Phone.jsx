import React from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = React.useState('')
  return (
    <Card tittle="Enter you Phone Number">
      <TextInput value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
      <div className={styles.buttonwrapper}>
        <Button text="Next" onClick={onNext}></Button>
      </div>
      <p className={styles.paragraph}>
        By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
      </p>
    </Card>
  )
}

export default Phone
