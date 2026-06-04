import React, { useState } from 'react'
import './FAQs.css'

const FAQs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null)

  const faqCategories = [
    {
      category: 'Shopping & Products',
      icon: '🛍️',
      questions: [
        {
          id: 1,
          question: 'How can I search for products?',
          answer: 'You can search for products using the search bar at the top of the page or browse by category in our Shop section. Use filters to narrow down your search by price, rating, and category.'
        },
        {
          id: 2,
          question: 'Are the products authentic?',
          answer: 'Yes, all products on ShopEase are 100% authentic. We source directly from authorized manufacturers and verified sellers. We guarantee the authenticity of every item sold on our platform.'
        },
        {
          id: 3,
          question: 'Do you offer product warranties?',
          answer: 'Most products come with manufacturer warranties. The warranty details are provided in the product description. You can also contact our support team for specific warranty information.'
        },
        {
          id: 4,
          question: 'Can I see product reviews before buying?',
          answer: 'Absolutely! Each product page displays detailed reviews and ratings from other customers. This helps you make informed decisions before purchasing.'
        }
      ]
    },
    {
      category: 'Orders & Shipping',
      icon: '📦',
      questions: [
        {
          id: 5,
          question: 'How do I track my order?',
          answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can use this number to track your package in real-time on our order tracking page.'
        },
        {
          id: 6,
          question: 'What is your shipping policy?',
          answer: 'We offer free shipping on orders above ₹500. Regular orders are delivered within 5-7 business days. Express delivery is available for select locations at additional cost.'
        },
        {
          id: 7,
          question: 'Do you deliver internationally?',
          answer: 'Currently, we deliver only within India. We are planning to expand our international shipping soon. Stay tuned for updates!'
        },
        {
          id: 8,
          question: 'Can I change my delivery address?',
          answer: 'You can change the delivery address before the order is dispatched. Once the order is shipped, address changes cannot be made. Please contact our support team immediately if you need to change the address.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      icon: '↩️',
      questions: [
        {
          id: 9,
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy on most products. Items must be unused and in original condition with all packaging intact. Some items may have specific return conditions.'
        },
        {
          id: 10,
          question: 'How do I initiate a return?',
          answer: 'Go to your order history, select the item you want to return, and click "Request Return". Follow the instructions to print a return label and send the item back to us.'
        },
        {
          id: 11,
          question: 'How long does a refund take?',
          answer: 'After we receive and verify your returned item, the refund is processed within 5-7 business days. You\'ll receive an email confirmation once the refund is completed.'
        },
        {
          id: 12,
          question: 'Can I exchange a product instead of returning it?',
          answer: 'Yes! You can exchange for a different size, color, or product. The exchange process is quick and hassle-free. Just select "Exchange" when initiating your return request.'
        }
      ]
    },
    {
      category: 'Account & Security',
      icon: '🔐',
      questions: [
        {
          id: 13,
          question: 'How do I create an account?',
          answer: 'Click on "Register" in the navbar and fill in your details. You\'ll receive a verification email to confirm your account. Once verified, you\'re ready to start shopping!'
        },
        {
          id: 14,
          question: 'Is my personal information safe?',
          answer: 'Yes, we use industry-standard SSL encryption to protect your data. We never share your personal information with third parties without your consent. Check our Privacy Policy for more details.'
        },
        {
          id: 15,
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. Follow the instructions to set a new password.'
        },
        {
          id: 16,
          question: 'Can I have multiple accounts?',
          answer: 'We recommend using only one account per person for better order tracking and customer service. If you have multiple accounts, you can contact our support team to merge them.'
        }
      ]
    },
    {
      category: 'Payment',
      icon: '💳',
      questions: [
        {
          id: 17,
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, digital wallets like Google Pay and Apple Pay, and bank transfers. All payments are processed securely.'
        },
        {
          id: 18,
          question: 'Is it safe to enter my payment details?',
          answer: 'Yes, we use advanced encryption and PCI-DSS compliant payment gateways. Your payment information is protected with the highest level of security.'
        },
        {
          id: 19,
          question: 'Do you offer installment payments?',
          answer: 'Yes! We offer EMI options for select products. During checkout, you\'ll see available installment plans. Select your preferred plan and complete the payment.'
        },
        {
          id: 20,
          question: 'Why was my payment declined?',
          answer: 'Payment can be declined due to insufficient funds, incorrect card details, or security reasons. Check your card details and try again. Contact your bank if the issue persists.'
        }
      ]
    },
    {
      category: 'Customer Support',
      icon: '📞',
      questions: [
        {
          id: 21,
          question: 'How can I contact customer support?',
          answer: 'You can reach our support team via the Contact Us page, email, or live chat. We\'re available 24/7 to assist you with any queries or issues.'
        },
        {
          id: 22,
          question: 'What is your response time?',
          answer: 'We aim to respond to all customer inquiries within 2 hours during business hours. For critical issues, our team works around the clock to assist you.'
        },
        {
          id: 23,
          question: 'Do you have a complaint resolution process?',
          answer: 'Yes, we have a systematic complaint resolution process. File a complaint through our website or contact support directly. We\'ll work to resolve your issue promptly.'
        },
        {
          id: 24,
          question: 'Can I request a callback?',
          answer: 'Absolutely! You can request a callback on the Contact Us page, and our support team will call you at your preferred time. No waiting on hold required!'
        }
      ]
    }
  ]

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  return (
    <div className="faqs">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="faq-hero-content">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">Find answers to common questions about shopping with ShopEase</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-section">
        <div className="faq-container">
          {faqCategories.map((category, index) => (
            <div key={index} className="faq-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2 className="category-title">{category.category}</h2>
              </div>

              <div className="accordion">
                {category.questions.map((faq) => (
                  <div key={faq.id} className="accordion-item">
                    <button
                      className={`accordion-header ${activeAccordion === faq.id ? 'active' : ''}`}
                      onClick={() => toggleAccordion(faq.id)}
                    >
                      <span className="accordion-question">{faq.question}</span>
                      <span className="accordion-icon">
                        {activeAccordion === faq.id ? '−' : '+'}
                      </span>
                    </button>

                    {activeAccordion === faq.id && (
                      <div className="accordion-content">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="faq-help">
        <div className="faq-container">
          <div className="help-card">
            <h2>Still Need Help?</h2>
            <p>Couldn't find the answer you're looking for? Our customer support team is here to help!</p>
            <div className="help-buttons">
              <a href="/contact" className="help-button primary">
                Contact Support
              </a>
              <a href="/contact" className="help-button secondary">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQs
