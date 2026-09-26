/* MulchMath engine - honest mulch math. UMD: browser global + Node. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MulchMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 1 cubic yard covers 324 sq ft at 1 inch deep (27 cu ft / (1/12 ft)).
  function cubicFeet(areaSqFt, depthIn) {
    return areaSqFt * depthIn / 12;
  }
  function cubicYards(areaSqFt, depthIn) {
    return areaSqFt * depthIn / 324;
  }

  // Bulk mulch is sold by the half yard. Nobody sells 1.85 yards.
  function orderYards(areaSqFt, depthIn) {
    var y = cubicYards(areaSqFt, depthIn);
    return Math.ceil((y - 1e-9) * 2) / 2;
  }

  // The classic bag is 2 cubic feet. 13.5 bags to a yard.
  function bagsNeeded(areaSqFt, depthIn, bagCuFt) {
    bagCuFt = bagCuFt || 2;
    return Math.ceil(cubicFeet(areaSqFt, depthIn) / bagCuFt - 1e-9);
  }

  // A standard homeowner wheelbarrow is 3 cubic feet heaped: 9 trips per yard.
  function wheelbarrowLoads(yards) {
    return Math.ceil(yards * 9 - 1e-9);
  }

  function settleAllowance(yards) {
    // Fresh mulch settles about 25% in the first season; the honest order rounds up.
    return Math.round(yards * 0.25 * 10) / 10;
  }

  function compare(areaSqFt, depthIn, opts) {
    opts = opts || {};
    var bagPrice = opts.bagPrice != null ? opts.bagPrice : 3.5;
    var bagCuFt = opts.bagCuFt || 2;
    var bulkPrice = opts.bulkPrice != null ? opts.bulkPrice : 38;
    var delivery = opts.delivery != null ? opts.delivery : 65;

    var yards = cubicYards(areaSqFt, depthIn);
    var oy = orderYards(areaSqFt, depthIn);
    var bags = bagsNeeded(areaSqFt, depthIn, bagCuFt);
    var bagTotal = Math.round(bags * bagPrice * 100) / 100;
    var bulkTotal = Math.round((oy * bulkPrice + delivery) * 100) / 100;
    var winner = bagTotal <= bulkTotal ? 'bags' : 'bulk';
    var savings = Math.round(Math.abs(bagTotal - bulkTotal) * 100) / 100;
    return {
      yards: Math.round(yards * 100) / 100,
      orderYards: oy,
      bags: bags,
      bagTotal: bagTotal,
      bulkTotal: bulkTotal,
      winner: winner,
      savings: savings,
      loads: wheelbarrowLoads(oy)
    };
  }

  function advice(cmp, depthIn) {
    if (depthIn > 4) {
      return 'Deeper than 4 inches suffocates roots and invites rot. Pull it back to 3 - mulch is a blanket, not a burial.';
    }
    if (cmp.yards < 1.5 && cmp.winner === 'bags') {
      return 'Under a yard and a half, bags win and your back forgives you. Skip the delivery fee, stack the trunk, done in one trip.';
    }
    if (cmp.winner === 'bulk') {
      return 'Bulk wins here even after the delivery fee - the bag aisle stops making sense around two yards. Have it dumped on a tarp, not the lawn.';
    }
    return 'Bags edge out bulk at this size once the delivery fee lands. Buy one more bag than the math says - the last bed always runs short.';
  }

  return {
    cubicFeet: cubicFeet,
    cubicYards: cubicYards,
    orderYards: orderYards,
    bagsNeeded: bagsNeeded,
    wheelbarrowLoads: wheelbarrowLoads,
    settleAllowance: settleAllowance,
    compare: compare,
    advice: advice
  };
});
