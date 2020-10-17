import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Grid, Typography, CircularProgress } from '../components/Material';
import config from '../config/config';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1rem'
  },
}));

export default function Detail() {
  const { oppId } = useParams();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(oppId);
    const handleGetData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${config.urlBase}/api/detail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ oppId })
        });
        console.log(res);
        const d = await res.json();
        //console.log(d);
        setData(d);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    handleGetData();
  }, [oppId]);

  const _row = (title, value, full) => {
    return <Grid item lg={full ? 12 : 6} xl={full ? 12 : 6}>
      <Grid container direction="row" alignItems="center">
        <Typography variant="overline" component="div" style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>{' '}
        <Typography variant="overline" component="div" align="left">
          {value}
        </Typography>
      </Grid>
    </Grid>
  }

  if (loading) {
    return <>
      <Grid container alignItems="center" style={{ padding: '1rem' }}>
        <CircularProgress />
        <div style={{ width: 10 }}>    </div>
        {'Cargando...'}
      </Grid>

    </>
  }

  return (
    <div>
      <Grid container>

        <Grid item lg={12} xl={12} className={classes.container}>
          <Typography variant="h5" id="tableTitle" component="div">
            General Informatión
          </Typography>
          <Grid container >


            {_row('Document Type: ', data.DocumentType)}
            {_row('Funding Opportunity Number: ', data.FundingOpportunityNumber)}
            {_row('Funding Opportunity Title: ', data.FundingOpportunityTitle)}
            {_row('Opportunity Category: ', data.OpportunityCategory)}
            {_row('Opportunity Category Explanation: ', data.OpportunityCategoryExplanation)}
            {_row('Funding Instrument Type: ', data.FundingInstrumentType)}
            {_row('Category of Funding Activity: ', data.CategoryofFundingActivity)}
            {_row('Category Explanation: ', data.CategoryExplanation)}
            {_row('Expected Number of Awards: ', data.ExpectedNumberofAwards)}
            {_row('CFDA Number(s): ', data['CFDANumber(s)'])}
            {_row('Cost Sharing or Matching Requirement: ', data.CostSharingorMatchingRequirement)}

            {_row('Version:	', data.Version)}
            {_row('Posted Date:', data.PostedDate)}
            {_row('Last Updated Date:', data.LastUpdatedDate)}
            {_row('Original Closing Date for Applications:', data.OriginalClosingDateforApplications)}
            {_row('Current Closing Date for Applications:	', data.CurrentClosingDateforApplications)}
            {_row('Archive Date:', data.ArchiveDate)}
            {_row('Estimated Total Program Funding:	', data.EstimatedTotalProgramFunding)}
            {_row('Award Ceiling:', data.AwardCeiling)}
            {_row('Award Floor:', data.AwardFloor)}

          </Grid>
        </Grid>

        <Grid item lg={12} xl={12}>
          <Grid container direction="column" className={classes.container}>
            <Typography variant="h6" id="tableTitle" component="div">
              Eligibility
          </Typography>
            {_row('Eligible Applicants:	', data.EligibleApplicants, true)}
            {_row('Additional Information on Eligibility:', data.AdditionalInformationonEligibility, true)}
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" className={classes.container}>
            <Typography variant="h6" id="tableTitle" component="div">
              Additional Information
          </Typography>
            {_row('Agency Name:', data.AgencyName, true)}
            {_row('Description:', data.Description, true)}
            {_row('Program Description:', data.ProgramDescription, true)}
          </Grid>
        </Grid>

      </Grid>
      <div></div>
    </div>
  )
}
