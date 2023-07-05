
import EmptyState from '@/app/components/EmptyState';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings from '@/app/actions/getListings';

import Properties from './Properties';

const PropertiesPage = async() => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subTitle="Please login"
    />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (!listings.length) {
    return (
      <EmptyState
        title="No properties found"
        subTitle="Looks like you have no properties."
      />
    );
  }

  return (
    <Properties
      listings={listings}
      currentUser={currentUser}
    />
  );
};

export default PropertiesPage;
