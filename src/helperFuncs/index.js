export const CalculateAccuracy = (typedLetters, correctLetters) =>
    `${Math.ceil((100 * correctLetters) / (typedLetters || 1))}%`;

export const CalculateCPM = (typedLetters) => `${Math.round(typedLetters)}CPM`;

export const fallBackParagraph = "However, they were lost without the fugal laugh that composed their examination. This is not to discredit the idea that the geranium of a pancake becomes a stagnant dugout. A bench sees an antelope as a bedded hexagon. A mythic millimeter's crocodile comes with it the thought that the wizen increase is a butane. A snoozy blanket is a Friday of the mind. A pillow is a creamlaid conifer. If this was somewhat unclear, the carol is a pillow. Some worthless streetcars are thought of simply as energies. The abstruse pumpkin reveals itself as an unrimed anatomy to those who look. A pajama is a doubting oil. The storms could be said to resemble chasmal cellars. What we don't know for sure is whether or not a peripheral sees a comic as a notchy vein. If this was somewhat unclear, skies are unroped benches. Those Saturdaies are nothing more than energies. Unfortunately, that is wrong; on the contrary, the rocket of a mimosa becomes a stricken author. The zeitgeist contends that the snowplow is a field. If this was somewhat unclear, a throat of the ear is assumed to be a grating veterinarian. A son is a pussy spy. Some posit the glabrate shirt to be less than blithesome. The straw is a certification."

export const codeString = `class BezierCurve {
	constructor(points) {
		this.n = points.length;
		this.p = [];

		// The binomial coefficient
		const c = [1];
		let i;
		let j;
		for (i = 1; i < this.n; ++i) {
			c.push(0);
			for (j = i; j >= 1; --j) {
				c[j] += c[j - 1];
			}
		}

		// the i-th control point times the coefficient
		for (i = 0; i < this.n; ++i) {
			this.p.push({x: c[i] * points[i].x, y: c[i] * points[i].y});
		}
	}

	/**
	 * @param Number float variable from 0 to 1
	 */
	get(t) {
		const res = {x: 0, y: 0};
		let i;
		let a = 1;
		let b = 1;

		// The coefficient
		const c = [];
		for (i = 0; i < this.n; ++i) {
			c.push(a);
			a *= t;
		}

		for (i = this.n - 1; i >= 0; --i) {
			res.x += this.p[i].x * c[i] * b;
			res.y += this.p[i].y * c[i] * b;
			b *= 1 - t;
		}
		return res;
	}
}

module.exports = BezierCurve;
Restart
A code snippet from algorithms.js: bezier_curve.js

License: MIT License

`