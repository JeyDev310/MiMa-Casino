import React, { Component } from 'react'

class WalletFooterContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: true,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <h6 className="text-left text-lightest text-muted text-tiny mt-3 mb-3 font-weight-normal">
        Payment Services, Purchase & Sale Transactions, and Credit Transactions
        <br /><br />
        1.1. USD Funds. You can load funds into your USD Wallet from a valid bank account via ACH transfer or wire transfer. Your USD balance is in a pending state and will not be credited to your USD Wallet until after the bank transfer has cleared, usually within five (5) business days. We may debit your linked bank account as soon as you initiate payment. The name on your linked bank account and your wire transfer must match the name verified on your <strong>Live Poker Studio™</strong> Account.
        <br /><br />
        1.2. Credit Transaction Payments. You may use the “Make A Payment” option on the <strong>Live Poker Studio™</strong> Site to authorize payments for any credit transaction with us or any of our affiliates, including any amount owing pursuant to any credit agreement you may enter into with us or any of our affiliates. With this option, you can authorize us or our affiliates to make a one-time charge to your linked deposit account through the ACH network (your “Preferred Payment Method”). You may select or approve the dollar amount and transaction date for each one-time payment you authorize using your Preferred Payment Method. We and our affiliates reserve the right to limit the amount and date of these one-time charges, screen transactions, and take other steps for our own risk management and business reasons. Although we or our affiliates will try to notify you if your depository institution is unable or unwilling to process any one-time charge using your Preferred Payment Method, you agree we are not required to do so and you are still required to make payments in the time and manner required by your credit agreement with us or any of our affiliates.
        <br /><br />
        1.3. Unauthorized and Incorrect Transactions. When a Digital Asset or USD transaction occurs using your credentials, we will assume that you authorized such transaction, unless you notify us otherwise. If you believe you did not authorize a particular transaction or that a transaction was incorrectly carried out, you must contact us as soon as possible via our help page at <strong>https://help.pokerstudio.online</strong>. It is important that you regularly check your USD Wallet and Digital Asset Wallet balances and your transaction history to ensure you notify us as soon as possible of any unauthorized or incorrect transactions. Reporting an unauthorized transaction does not guarantee <strong>Live Poker Studio™</strong> will be able to reverse the transaction or reimburse you for the transaction.
        <br /><br />
        1.4. Account Information. You will be able to see your USD Wallet and Digital Asset Wallet balances using the  <strong>Live Poker Studio™</strong> Site. You can also see your transaction history using the <strong>Live Poker Studio™</strong> Site, including (i) the amount (and currency) of each Digital Asset Transaction; (ii) a reference to the identity of the payer and/or payee (as appropriate); (iii) any fees charged; (iv) if applicable, the rate of exchange, and the amount (in the new currency) after exchange (where you are the payer) or the amount (in the original currency) before the exchange (where you are the payee); and (v) the date of each Digital Asset Transaction.
        <br /><br />
        1.5. Reversals & Cancellations. You cannot cancel, reverse, or change any transaction marked as complete or pending. If your payment is not successful, if your payment method has insufficient funds, or if you reverse a payment made from funds in your bank account, you authorize <strong>Live Poker Studio™</strong>, in its sole discretion, either to cancel the transaction or to debit your other payment methods, including your USD Wallet or Digital Asset Wallet balances or other linked accounts, in any amount necessary to complete the transaction.
        <br /><br />
        1.6. Payment Services Partners. <strong>Live Poker Studio™</strong> may use a third party payment processor to process any US Dollar payment between you and <strong>Live Poker Studio™</strong>, including but not limited to payments in relation to your use of the Digital Asset Transactions or deposits or withdrawals from your USD Wallet or <strong>Live Poker Studio™</strong> Account.
        <br /><br />
        1.7. Personal Data. You acknowledge that we may process personal data in relation to you (if you are an individual), and personal data that you have provided or in the future provide to us in relation to your employees and other associated individuals, in connection with this Agreement, or the <strong>Live Poker Studio™</strong> Services. Accordingly, you represent and warrant that: (i) your disclosure to us of any personal data relating to individuals other than yourself was or will be made in accordance with all applicable data protection and data privacy laws, and such data are accurate, up to date and relevant when disclosed; (ii) before providing any such personal data to us, you have read and understood our Privacy Policy, and, in the case of personal data relating to an individual other than yourself, have (or will at the time of disclosure have) provided a copy of that Privacy Policy (as amended from time to time), to that individual; and (iii) if from time to time we provide you with a replacement version of the Privacy Policy, you will promptly read that notice and provide a copy to any individual whose personal data you have provided to us.
        <br /><br />
        1.8. Security Breach. If you suspect that your <strong>Live Poker Studio™</strong> Account or any of your security details have been compromised or if you become aware of any fraud or attempted fraud or any other security incident (including a cyber-security attack) affecting you and/or <strong>Live Poker Studio™</strong> (collectively a "Security Breach"), you must notify <strong>Live Poker Studio™</strong> Support immediately at <strong>https://help.pokerstudio.online</strong> and provide accurate and up to date information throughout the duration of the Security Breach. You must take any steps that we reasonably require to reduce or manage any Security Breach. Prompt reporting of a Security Breach does not guarantee that <strong>Live Poker Studio™</strong> will reimburse you for any losses suffered or be liable to you for any losses suffered as a result of the Security Breach.
        <br /><br />
        1.9. Computer Viruses. We shall not bear any liability, whatsoever, for any damage or interruptions caused by any computer viruses or other malicious code that may affect your computer or other equipment, or any phishing, spoofing or other attack. We advise the regular use of a reputable and readily available virus screening and prevention software. You should also be aware that SMS and email services are vulnerable to spoofing and phishing attacks and should use care in reviewing messages purporting to originate from <strong>Live Poker Studio™</strong>. Always log into your <strong>Live Poker Studio™</strong> Account(s) through the <strong>Live Poker Studio™</strong> Site to review any transactions or required actions if you have any uncertainty regarding the authenticity of any communication or notice.
      </h6>
    )
  }
}

export default WalletFooterContent