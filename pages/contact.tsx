import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';

import siteMetadata from '@/data/siteMetadata';
import { contact } from 'config/contact';

function Contact(): React.ReactElement {
  return (
    <>
      <PageSEO
        title={`Contact - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='Contact' />
        <div className='container py-12'>
          <p>
            Do you have a project in mind? Want to hire me? or simply wanna
            chat? Feel free to
            <span
              className='ml-2 cursor-pointer !font-normal !text-black !no-underline dark:!text-white'
              // onClick={onScheduleMeeting}
              role='button'
              tabIndex={0}
            >
              send me a dm or an email (all contacts can be found in the footer)
              {/* <RoughNotation
                show
                type='underline'
                strokeWidth={2}
                animationDelay={250}
                animationDuration={2000}
                color={randomColor}
              >
                schedule a meeting
              </RoughNotation> */}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Contact;
