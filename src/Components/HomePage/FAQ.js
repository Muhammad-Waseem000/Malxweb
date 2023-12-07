import React from 'react'

function FAQ() {
  return (
  <>
  <div className='container'>
    <div className='row' style={{marginTop:"40px"}}>
        <div className='col-md-12' style={{textAlign:"center"}}>
                 <h1>FAQs</h1>
        </div>
    </div>
  </div>
  <div className='container'>
    <div className='row' style={{marginTop:"40px"}}>
        <div className='col-md-12'>
            
        <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Is there a difference between viruses and malware? 
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      Even in 2021, viruses are still a cybersecurity threat. A virus infection is harmful software triggered by performing common tasks such as opening an email attachment, launching an infected program, or viewing an ad on a malicious site. Viruses self-replicate by modifying or completely replacing files.

Viruses are a type of malware. Threat actors use malware often in an attempt to gain money illicitly. Although it likely won't damage the physical hardware of your device or network equipment, different types of malware can be used to steal, encrypt, or delete your data, alter or hijack core computer functions, and spy on your activity.

The best way to protect against a virus infection and malware is to use a legitimate antivirus and anti-malware solution such as Malwarebytes Premium, which not only cleans up viruses but other threats too. It’s powered by artificial intelligence and machine learning and uses multiple types of security technology to keep your device safe.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      How do I check for viruses? 
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      To check for viruses, install our free virus scanner, click "Scan" and it will search your device for any viruses or other types of malware. If any viruses or other malware are found, you can then click to remove them. See our step-by-step instructions on how to scan and remove viruses above.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      How do I remove a virus?
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      If you’re wondering how to remove viruses, you’ve come to the right place. If your device is showing symptoms of a virus, Malwarebytes’ free virus scanner will scan your computer for viruses and remove them. It will perform a fast, free online scan for viruses and let you know if you’ve been infected. If you give your ok, it will then delete viruses and malware.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      How do I run an antivirus scan? 
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      We make it easy for you to run an antivirus scan on your device. First, install our antivirus/anti-malware software, then click "Scan." Once complete, you can remove any viruses and malware that were found. You can also see our step-by-step instructions on how to scan and remove viruses above. 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Does Malwarebytes remove all malware?
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


      </div>
    </div>
  </div>
</div>
        </div>
    </div>
  </div>
  </>
  )
}

export default FAQ
