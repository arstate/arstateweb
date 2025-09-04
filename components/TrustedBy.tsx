
import React from 'react';

const clientLogos = [
  'https://lh3.googleusercontent.com/pw/AP1GczNIE4fXybTRL8Ht3XzVCIGgDFRXVO39S8UcstyXDMbXQVotU9g6kNNoc9JpNAH5eI5FeQH68t5V2u--gaRr56llCkY_88kIkOLfNvDqBWpkXoSVg-Y=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczMRznDyiPFpfypkwHUW6olk8GDD0KeFj7yIpI2U4JMOGc4kfsem_EhGjRI0vwK2hZDg_5sStnKlwi33wUgLoHcrNK_xSXiOVpHFR1H7dTVWv-jL4s8=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczMGif1CXOtxsHvgjNxsDUUa-AJfIPH5gKoL2U001gqBx9w7xhKuBMyKqtGsAxgRnt95chEcyZyPpMDzP2TGv8MO2C98EDfVQIlYl1HY1-HLuNo13Oo=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczMm4LGcfHZGMxcdTKvdraOGzWCKMjSwXfADN33pbHwkyBNWi82bkGpwkhqVdvNgkgyUZJXfm1VzYBB2e1i-SDVv0NCoFdENmpevZ7uu3SpamRBJvzk=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczO5QerGFj-bmyXScJIy7C-IrFECHRLa6l77MEZWq23xpPTSaHrVGuqer1kEbGpQiiOeq_O0M8tJPZdNfHkvznIgf_MNBfixEIyPnQ40Gy-tAxTcDIM=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczOM3nxIWoLu3gydPH3lnh1BsSQvwusIPuVYXELvG5NUYxSCcVO773QDAfHbk84DSbROyIcfwtaBra2rMjvRTSu9Ry_OMI-nZWOqZ-QxKlLnyVACcbE=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczMSkltm1HXa8GARgUYGpwGakoiK4fK3_dvTGWqoAp1fbpzPE_cky1qB7Uct-ElZ8tOTR-IH0-NhUcQmg4sV9UZbxFQsvny76EoFmevXCJFH-h9QB0g=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczOkSwHjXanhEfMs-BEI0bn3pnXIUNtEb98aKJ1VIiFtgudZyf4kESUKxwuRWAwtowuUc-OlXDRKt_zm8RyUXVVNJ6CncfhH-TeJGEUebFIDGKda9WQ=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczO2Amunj41IK1c-GnDamPj-tuLn_J6XwXAroiaPNXB84GKNVekMgLjCoQ8O1GBaeiQnFmCCOqKIUIDsj4JDj1o_ybBtsCAq5Ilv5pAKYOoqJVez9Bo=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczP7ZIyPYFccTxULt4paPhZbryATprbHZ2aXhzMuUfbiRgaq2T59TEherJvPMx9TWBw8AHLCW0MjiwDDGQDChg_Epyyv_sIrJJFwMiDh-5IKdWaGfp0=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczONriU-ifYMhajwYIXncWoXbFh7m3KeLOZr6qmLeNKFrCFKkI0Z13TZZHFxD15JFDa7EpPzZG27vHOXqczbTiviLgM9aIA6KBFw9f4JdvIV4gqRY3E=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczPCpg5anuEcF3P0035hnOY7EolR97hE5nUa_oCQZSeoaZVzGoPhQMmVfK6vhDvWDZdr4knMp3xoToL1yvqi9pAiGf2aWvf0vA8eehvHu8foyDl96lA=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczMIxkp8zaPabVmx3OOA2t2CTtQjzq3QZT1x_FioLRFTFoMgR7YOyGjAR2EBzJsqZdkXgtHZdrDzgtVVslIfVbThjLiAt8ObUjZFhqbxdhmCGWdYzfc=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczPIfDC0zKA9wFb3ofnhgM5r-gMxMe86hwz76JWh7qwRUw9TjeF4wg0vhVnCTeFQUPArp6YTobffOZTH4Ia4yRUbeMPIWf46Slcqkci7lkiT4mN_DOc=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczOx5ePZV5RrRsEiPDywJ_yxUUqHTi1X1YeVCYaRT1BATD2ETIHW9_LYBz87GF5TFW5EJ1TS_HZ7Fz5LlYvXubY0W8vwlO65nfxYOB6NzDw0kHUmVJg=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczO3d-W44OPyeWC35-odmY7y7qoKyyPbR05hsc-n0acUfRbbd3gJVfN13BEWxPP9nLA8KBXqt7mu2cfofilTieqdgJm1C2DbgdWXsEp4E6a4MeSchbE=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczOMV2T0ZJ5-3o7mm385iHzAZ6gsgFORYVYY62BZFKUmsyBm0qGBa4yO2fEmjn-Mm7AeIXR-lR62c44Kw3zPlworxERKeW1IS86BlFqBH0z5jrahvBc=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczNJMRLLwoCQxjE4pgbImVCXx03dHVU7fgEZtMUFY2HStFB3i_9nw6THh0htXS6iTe3NPTCncPEu35EJpq9Svms4UfRUzL9u2hNpKeuG4PdynO6AkF8=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczMa9-86t8DwW17oMmZEuGvbCiqtzOV6ea66hchdojcuBGwSWB5RngLmcnGGEUJ8vqYwDukAA4O6AWaPIUJHiZKD4-fajGkQmPwFq3YPVCTLPuX8SNo=w2400',
  'https://lh3.googleusercontent.com/pw/AP1GczO-DXv5MG48rouLLiWH7YjOxnjWATITzuPm_KmrFReEkbCDTqDxgPOAgVFhGmELMgYYxztuW-famwHWTD-8a06ybgw3raJnobQ8XeHj91FOi_1BDUA=w2400',
];

const TrustedBy: React.FC = () => {
  return (
    <section className="pt-40 pb-20 overflow-x-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4 transition-colors duration-1000">
          Telah Dipercaya Oleh
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-1000">
          Kami bangga telah menjadi bagian dari cerita sukses berbagai klien dan acara.
        </p>
      </div>
      <div 
        className="relative group mt-12"
      >
        <div className="absolute inset-0 pointer-events-none z-10"
             style={{
                backdropFilter: 'blur(3px)',
                WebkitMaskImage: 'linear-gradient(to right, black, transparent 30%, transparent 70%, black)',
                maskImage: 'linear-gradient(to right, black, transparent 30%, transparent 70%, black)',
             }}
        ></div>
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-36 h-36 mx-4 my-10 flex items-center justify-center bg-gray-100 dark:bg-white-100 p-4 rounded-2xl border-2 border-gray-300 dark:border-sky-300 transition-all duration-300 ease-in-out hover:border-gold hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-2"
              title={`Client ${index + 1}`}
            >
              <img src={logo} alt={`Client logo ${index + 1}`} className="h-24 w-full object-contain pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;